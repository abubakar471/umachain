#include "Crypto.h"
#include <openssl/evp.h>
#include <openssl/pem.h>
#include <openssl/err.h>
#include <openssl/sha.h>
#include <openssl/bio.h>
#include <openssl/buffer.h>
#include <sstream>
#include <iomanip>
#include <cstring>
#include <vector>
#include <iostream>
#include <openssl/opensslv.h>

using namespace std;

namespace umachain::crypto {

// ----------- Base64 helpers -------------
string bytesToBase64(const unsigned char *data, size_t len) {
    BIO *b64 = BIO_new(BIO_f_base64());
    BIO *mem = BIO_new(BIO_s_mem());
    BIO_set_flags(b64, BIO_FLAGS_BASE64_NO_NL); // no newlines
    BIO *bio = BIO_push(b64, mem);
    BIO_write(bio, data, (int)len);
    BIO_flush(bio);

    BUF_MEM *bptr;
    BIO_get_mem_ptr(mem, &bptr);
    string b64str(bptr->data, bptr->length);
    BIO_free_all(bio);
    return b64str;
}

vector<unsigned char> base64ToBytes(const string &b64) {
    BIO *b64bio = BIO_new(BIO_f_base64());
    BIO *mem = BIO_new_mem_buf(b64.data(), (int)b64.size());
    BIO_set_flags(b64bio, BIO_FLAGS_BASE64_NO_NL);
    BIO *bio = BIO_push(b64bio, mem);

    vector<unsigned char> out(b64.size());
    int decoded = BIO_read(bio, out.data(), (int)out.size());
    if (decoded < 0) decoded = 0;
    out.resize(decoded);
    BIO_free_all(bio);
    return out;
}

// ---------- SHA256 hex ----------
string sha256Hex(const string &data) {
    unsigned char digest[SHA256_DIGEST_LENGTH];
    SHA256(reinterpret_cast<const unsigned char*>(data.data()), data.size(), digest);
    ostringstream ss;
    ss << hex << setfill('0');
    for (int i = 0; i < SHA256_DIGEST_LENGTH; ++i) {
        ss << setw(2) << (int)digest[i];
    }
    return ss.str();
}

// ---------- Key generation (PEM) ----------
bool generateKeypairPEM(string &pubPemOut, string &privPemOut) {
    bool ok = false;
    EVP_PKEY_CTX *pctx = nullptr;
    EVP_PKEY *pkey = nullptr;
    BIO *bpriv = nullptr;
    BIO *bpub = nullptr;
    BUF_MEM *bptr = nullptr;

    do {
        pctx = EVP_PKEY_CTX_new_id(EVP_PKEY_EC, NULL);
        if (!pctx) break;
        if (EVP_PKEY_keygen_init(pctx) <= 0) break;
        if (EVP_PKEY_CTX_set_ec_paramgen_curve_nid(pctx, NID_X9_62_prime256v1) <= 0) break;

        if (EVP_PKEY_keygen(pctx, &pkey) <= 0) break;

        // Export private key (PKCS8 PEM)
        bpriv = BIO_new(BIO_s_mem());
        if (!bpriv) break;
        if (!PEM_write_bio_PKCS8PrivateKey(bpriv, pkey, NULL, NULL, 0, 0, NULL)) break;
        BIO_get_mem_ptr(bpriv, &bptr);
        privPemOut.assign(bptr->data, bptr->length);
        BIO_free(bpriv);
        bpriv = nullptr;

        // Export public key (SPKI PEM)
        bpub = BIO_new(BIO_s_mem());
        if (!bpub) break;
        if (!PEM_write_bio_PUBKEY(bpub, pkey)) break;
        BIO_get_mem_ptr(bpub, &bptr);
        pubPemOut.assign(bptr->data, bptr->length);
        BIO_free(bpub);
        bpub = nullptr;

        ok = true;
    } while (false);

    if (bpriv) BIO_free(bpriv);
    if (bpub) BIO_free(bpub);
    if (pkey) EVP_PKEY_free(pkey);
    if (pctx) EVP_PKEY_CTX_free(pctx);
    return ok;
}

// ---------- Sign message (priv PEM) ----------
string signMessageBase64(const string &privPem, const string &message) {
    // Load private key from PEM (PKCS8 or traditional)
    BIO *bio = BIO_new_mem_buf(privPem.data(), (int)privPem.size());
    EVP_PKEY *pkey = PEM_read_bio_PrivateKey(bio, NULL, NULL, NULL);
    BIO_free(bio);
    if (!pkey) throw runtime_error("Failed to load private key PEM");

    EVP_MD_CTX *mdctx = EVP_MD_CTX_new();
    if (!mdctx) { EVP_PKEY_free(pkey); throw runtime_error("EVP_MD_CTX_new failed"); }

    if (EVP_DigestSignInit(mdctx, NULL, EVP_sha256(), NULL, pkey) != 1) {
        EVP_MD_CTX_free(mdctx); EVP_PKEY_free(pkey); throw runtime_error("DigestSignInit failed");
    }

    if (EVP_DigestSignUpdate(mdctx, message.data(), message.size()) != 1) {
        EVP_MD_CTX_free(mdctx); EVP_PKEY_free(pkey); throw runtime_error("DigestSignUpdate failed");
    }

    size_t siglen = 0;
    if (EVP_DigestSignFinal(mdctx, NULL, &siglen) != 1) {
        EVP_MD_CTX_free(mdctx); EVP_PKEY_free(pkey); throw runtime_error("DigestSignFinal (len) failed");
    }
    vector<unsigned char> sig(siglen);
    if (EVP_DigestSignFinal(mdctx, sig.data(), &siglen) != 1) {
        EVP_MD_CTX_free(mdctx); EVP_PKEY_free(pkey); throw runtime_error("DigestSignFinal failed");
    }
    sig.resize(siglen);

    string b64 = bytesToBase64(sig.data(), sig.size());
    EVP_MD_CTX_free(mdctx);
    EVP_PKEY_free(pkey);
    return b64;
}

// ---------- Verify signature (pub PEM) ----------
bool verifySignaturePEM(const string &pubPem, const string &message, const string &sigB64) {
    BIO *bio = BIO_new_mem_buf(pubPem.data(), (int)pubPem.size());
    EVP_PKEY *pkey = PEM_read_bio_PUBKEY(bio, NULL, NULL, NULL);
    BIO_free(bio);
    if (!pkey) return false;

    EVP_MD_CTX *mdctx = EVP_MD_CTX_new();
    if (!mdctx) { EVP_PKEY_free(pkey); return false; }

    if (EVP_DigestVerifyInit(mdctx, NULL, EVP_sha256(), NULL, pkey) != 1) {
        EVP_MD_CTX_free(mdctx); EVP_PKEY_free(pkey); return false;
    }
    if (EVP_DigestVerifyUpdate(mdctx, message.data(), message.size()) != 1) {
        EVP_MD_CTX_free(mdctx); EVP_PKEY_free(pkey); return false;
    }
    auto sig = base64ToBytes(sigB64);
    int rc = EVP_DigestVerifyFinal(mdctx, sig.data(), sig.size());
    EVP_MD_CTX_free(mdctx);
    EVP_PKEY_free(pkey);
    return rc == 1;
}

} // namespace umachain::crypto
