#ifndef BLOCK_H
#define BLOCK_H

#include <string>
#include <vector>
#include "Transaction.h"

class Block
{
    public:
        int index;
        std::string timestamp;
        std::vector<Transaction> transactions;
        std::string previousHash;
        std::string hash;
        int nonce;

        // Constructor declaration (defined in Block.cpp)
        Block(int idx, const std::string &time, const std::vector<Transaction> &txs, const std::string &prevHash);

        std::string calculateHash();
        void mineBlock(int difficulty);
};

#endif