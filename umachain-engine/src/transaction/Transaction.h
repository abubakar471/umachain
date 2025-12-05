#ifndef TRANSACTION_H
#define TRANSACTION_H

#include <string>
#include "../../include/json.hpp"

enum TxStatus
{
    PENDING,
    CONFIRMED
};

class Transaction
{
public:
    std::string sender;
    std::string receiver;
    double amount;
    TxStatus status;

    std::string signatureBase64; // signature of canonical string
    std::string pubKeyPem;       // sender's public key, PEM format

    // constructor
    Transaction(const std::string &from, const std::string &to, double amt);

    nlohmann::json toJSON() const
    {
        return {
            {"sender", sender},
            {"receiver", receiver},
            {"amount", amount},
            {"status", (int)status}};
    }
};

#endif