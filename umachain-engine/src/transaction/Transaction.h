#ifndef TRANSACTION_H
#define TRANSACTION_H

#include<string>

class Transaction{
    public:
        std::string sender;
        std::string receiver;
        int amount;

        // constructor
        Transaction(const std::string &from, const std::string &to, int amt);
};

#endif