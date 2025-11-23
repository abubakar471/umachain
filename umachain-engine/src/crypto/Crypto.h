#pragma once // to ensure that the current header file is included only once during a single compilation of the source file
#include <string>
#include <vector>

namespace umachain::crypto
{
    // Generate an ECDSA P-256 keypair and return PEM-encoded strings.
    // On success: returns true and fills pubPem and privPem (PEM strings).
    bool generateKeypairPEM(std::string &pubPemOut, std::string &privPemOut);

    // Sign a message (raw bytes). Returns base64-encoded signature.
    // Uses ECDSA+SHA256 on private key PEM.
    std::string signMessageBase64(const std::string &privPem, const std::string &message);

    // Verify a base64 signature created by signMessageBase64.
    // Returns true if signature valid.
    bool verifySignaturePEM(const std::string &pubPem, const std::string &message, const std::string &sigB64);

    // Compute SHA256(hex) of input bytes and return lowercase hex string.
    std::string sha256Hex(const std::string &data);

    // Utility: decode base64 to bytes
    std::vector<unsigned char> base64ToBytes(const std::string &b64);

    // Utility: encode bytes to base64
    std::string bytesToBase64(const unsigned char *data, size_t len);
}