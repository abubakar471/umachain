#ifndef BLOCKCHAIN_H
#define BLOCKCHAIN_H

#include <vector>
#include "Block.h"

class Blockchain{
    private: 
        std::vector<Block> chain;
        int difficulty;

    public:
        Blockchain();

        Block createGenesisBlock();
        Block getLatestBlock();

        void addBlock(const std::string &data);
        bool isValidChain();

        void saveToFile();
        void loadFromFile();
};

#endif