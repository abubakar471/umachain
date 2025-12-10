#include "Transaction.h"
#include <openssl/sha.h>
#include <iomanip>

Transaction::Transaction() : sender(""), receiver(""), amount(0), status(PENDING), timestamp(0) {}


Transaction::Transaction(const std::string &from, const std::string &to, double amt)
{
    sender = from;
    receiver = to;
    amount = amt;
    status = PENDING;
    timestamp = (long long)(std::chrono::duration_cast<std::chrono::milliseconds>(
                                std::chrono::system_clock::now().time_since_epoch())
                                .count());
    id = generateId(sender, receiver, amount, timestamp);
}

std::string Transaction::generateId(const std::string &sender, const std::string &receiver, double amount, long long timestamp)
{
    std::ostringstream oss;
    oss << sender << "|" << receiver << "|" << std::fixed << std::setprecision(8) << amount << "|" << timestamp;
    std::string s = oss.str();

    unsigned char hash[SHA256_DIGEST_LENGTH];
    SHA256((const unsigned char *)s.data(), s.size(), hash);
    std::ostringstream hex;
    for (int i = 0; i < SHA256_DIGEST_LENGTH; ++i)
        hex << std::hex << std::setw(2) << std::setfill('0') << (int)hash[i];
    return hex.str();
}

nlohmann::json Transaction::toJSON() const
{
    nlohmann::json j;
    j["id"] = id;
    j["sender"] = sender;
    j["receiver"] = receiver;
    j["amount"] = amount;
    j["status"] = status;
    j["timestamp"] = timestamp;
    if (!signatureBase64.empty())
        j["signature"] = signatureBase64;
    if (!pubKeyPem.empty())
        j["pubKeyPem"] = pubKeyPem;
    return j;
}

Transaction Transaction::fromJSON(const nlohmann::json &j)
{
    Transaction tx;
    tx.id = j.value("id", std::string());
    tx.sender = j.value("sender", std::string());
    tx.receiver = j.value("receiver", std::string());
    tx.amount = j.value("amount", 0.0);
    tx.status = j.value("status", PENDING);
    tx.timestamp = j.value("timestamp", 0LL);
    tx.signatureBase64 = j.value("signature", std::string());
    tx.pubKeyPem = j.value("pubKeyPem", std::string());
    return tx;
}