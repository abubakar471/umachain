#ifndef BLOCKCHAIN_H
#define BLOCKCHAIN_H

#include <vector>
#include "Block.h"
#include "Transaction.h"

class Blockchain
{
private:
    std::vector<Block> chain;
    std::vector<Transaction> mempool; // unconfirmed transactions
    int difficulty;

public:
    Blockchain();

    Block createGenesisBlock();
    Block getLatestBlock();



    void addTransaction(const Transaction &tx);             // add transaction to mempool for mining
    bool minePendingTransactions(const std::string &miner); // mine pending transactions and adds to the blockchain
    double getBalance(const std::string &walletAddress);

    bool isValidChain();
    std::vector<Block> getChain() { return chain; };

    void saveToFile();
    void loadFromFile();
};

#endif