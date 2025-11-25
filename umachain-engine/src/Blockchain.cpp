#include "Blockchain.h"
#include <fstream>
#include <ctime>
#include <sstream>
#include <iostream>

Blockchain::Blockchain()
{
    loadFromFile();
    difficulty = 5;

    if (chain.empty())
    {
        chain.push_back(createGenesisBlock());
        saveToFile();
    }
}

Block Blockchain::createGenesisBlock()
{
    return Block(0, "2025-25-11", {}, "0");
}

Block Blockchain::getLatestBlock()
{
    return chain.back();
}

// -----------------------------------
//      Add transaction to mempool
// -----------------------------------

void Blockchain::addTransaction(const Transaction &tx)
{
    mempool.push_back(tx);
}

// -----------------------------------------------------
//      Mine block containing all transaction in mempool
// -----------------------------------------------------

bool Blockchain::minePendingTransactions(const std::string &miner)
{
    if (mempool.empty())
    {
        std::cout << "No pending transactions to mine!\n";
        return false;
    }

    int newIndex = chain.size();

    // get current time
    time_t now = time(0);

    std::string timestr = ctime(&now);

    // create block with all mempool transactions
    Block newBlock(newIndex, timestr, mempool, getLatestBlock().hash);

    // Mine the block
    newBlock.mineBlock(difficulty);

    // Add block to chain
    chain.push_back(newBlock);

    // clear mempool after mining
    mempool.clear();

    // save updated chain to file
    saveToFile();

    return true; // block mined successfully
}

double Blockchain::getBalance(const std::string &walletAddress) {
    double balance = 0.0;

    // Go through every block
    for (const auto &block : chain) {
        // Go through each transaction
        for (const auto &tx : block.transactions) {
            if (tx.sender == walletAddress) {
                balance -= tx.amount;
            }
            if (tx.receiver == walletAddress) {
                balance += tx.amount;
            }
        }
    }

    return balance;
}


// -------------------------
//      Validate the chain
// -------------------------

bool Blockchain::isValidChain()
{
    for (size_t i = 1; i < chain.size(); i++)
    {
        Block current = chain[i];
        Block previous = chain[i - 1];

        if (current.hash != current.calculateHash())
        {
            return false;
        }

        if (current.previousHash != previous.hash)
        {
            return false;
        }
    }

    return true;
}

// -----------------------------
//    Save chain to a .dat file
// -----------------------------
void Blockchain::saveToFile()
{
    std::ofstream file("blockchain.dat");

    for (auto &block : chain)
    {
        file << block.index << "\n";
        file << block.timestamp;
        file << block.previousHash << "\n";
        file << block.hash << "\n";

        // save tx count
        file << block.transactions.size() << "\n";

        // save each transaction
        for(auto &tx : block.transactions){
            file << tx.sender << "\n";
            file << tx.receiver << "\n";
            file << tx.amount << "\n";
        }

        file << "---\n";
    }
}

// -----------------------------
//     Load chain from .dat file
// -----------------------------

void Blockchain::loadFromFile()
{
    chain.clear();

    std::ifstream file("blockchain.dat");

    if (!file.good())
        return;

     int index;
    std::string timestamp, prevHash, hash;
    std::string separator;

    while (file >> index)
    {
        file.ignore();
        std::getline(file, timestamp);
        std::getline(file, prevHash);
        std::getline(file, hash);

        int txCount;
        file >> txCount;
        file.ignore();

        std::vector<Transaction> txs;
        for (int i = 0; i < txCount; i++)
        {
            std::string sender, receiver;
            double amount;

            std::getline(file, sender);
            std::getline(file, receiver);
            file >> amount;
            file.ignore();

            txs.push_back(Transaction(sender, receiver, amount));
        }

        std::getline(file, separator);

        Block block(index, timestamp, txs, prevHash);
        block.hash = hash;

        chain.push_back(block);
    }
}