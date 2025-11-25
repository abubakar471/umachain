#ifndef BLOCKCHAIN_H
#define BLOCKCHAIN_H

#include <vector>
#include <iostream>
#include "../block/Block.h"
#include "../transaction/Transaction.h"

class Blockchain
{
private:
    std::vector<Block> chain;
    std::vector<Transaction> mempool; // unconfirmed transactions
    int difficulty;
    double miningReward;

public:
    Blockchain();

    Block createGenesisBlock();
    Block getLatestBlock();

    void addTransaction(const Transaction &tx);                    // add transaction to mempool for mining
    bool minePendingTransactions(const std::string &minerAddress); // mine pending transactions and adds to the blockchain
    double getBalance(const std::string &walletAddress);

    bool isValidChain();
    std::vector<Block> getChain()
    {
        std::cout << "-----carrying chain blocks-----" << std::endl;
        std::cout << "chain size : " << (int)chain.size() << std::endl;
        for (int i = 0; i < (int)chain.size(); i++)
        {
            std::cout << "hash : " << chain[i].hash << std::endl;
        }
        return chain;
    };
    std::vector<Transaction> getMempool() { return mempool; };

    void saveToFile();
    void loadFromFile();
};

#endif