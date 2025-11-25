#include "Blockchain.h"
#include <fstream>
#include <ctime>
#include <limits>
#include <sstream>
#include <iostream>
#include "../../include/json.hpp"

Blockchain::Blockchain()
{
    loadFromFile();
    difficulty = 5;
    miningReward = 2.0;

    if (chain.empty())
    {
        chain.push_back(createGenesisBlock());
        saveToFile();
    }
}

Block Blockchain::createGenesisBlock()
{
    Block newBlock(0, "2025-25-11", {}, "0");
    newBlock.mineBlock(difficulty);

    return newBlock;
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

bool Blockchain::minePendingTransactions(const std::string &minerAddress)
{
    if (mempool.empty())
    {
        std::cout << "No pending transactions to mine!\n";
        return false;
    }

    // 1. Add block reward (free coins from system)
    Transaction rewardTx("SYSTEM", minerAddress, miningReward);
    rewardTx.status = TxStatus::CONFIRMED;
    mempool.push_back(rewardTx);

    // 2. create block with all mempool transactions
    int newIndex = chain.size();

    // get current time
    time_t now = time(0);

    std::string timestr = ctime(&now);

    // ctime() returns a string that usually ends with '\n' (and on Windows may include '\r').
    // Remove trailing CR/LF so timestamps don't introduce blank lines in saved files.
    while (!timestr.empty() && (timestr.back() == '\n' || timestr.back() == '\r')) {
        timestr.pop_back();
    }


    /* 
        setting the pending transactions status to confirmed thhose are about to be added to a new block that are going to be added to the blockchain 
    */
    for (auto &tx : mempool) {
        tx.status = TxStatus::CONFIRMED;
    }

    Block newBlock(newIndex, timestr, mempool, getLatestBlock().hash);

    // 3. Perform PoW, Mine the block
    newBlock.mineBlock(difficulty);

    // 4. Add block to chain
    chain.push_back(newBlock);

    // 5. Clear mempool
    mempool.clear();

    // save updated chain to file
    saveToFile();

    return true; // block mined successfully
}

double Blockchain::getBalance(const std::string &walletAddress)
{
    double balance = 0.0;

    // Go through every block
    for (const auto &block : chain)
    {
        // Go through each transaction
        for (const auto &tx : block.transactions)
        {
            if (tx.sender == walletAddress)
            {
                balance -= tx.amount;
            }
            if (tx.receiver == walletAddress)
            {
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
void Blockchain::saveToFile() {
    saveToJSON();
}

void Blockchain::saveToJSON() {
    nlohmann::json jChain = nlohmann::json::array();

    for (const auto &block : chain)
        jChain.push_back(block.toJSON());

    std::ofstream file("../data/blockchain.json");
    file << jChain.dump(4);   // pretty print JSON
}

// -----------------------------
//     Load chain from .dat file
// -----------------------------
void Blockchain::loadFromFile() {
    loadFromJSON();
}

void Blockchain::loadFromJSON() {
    std::ifstream file("../data/blockchain.json");
    if (!file.good())
        return;

    nlohmann::json jChain;
    file >> jChain;

    chain.clear();
    for (auto &jBlock : jChain)
    {
        int index = jBlock["index"];
        std::string timestamp = jBlock["timestamp"];
        std::string prevHash = jBlock["previousHash"];
        std::string hash = jBlock["hash"];

        std::vector<Transaction> txs;
        for (auto &jTx : jBlock["transactions"])
        {
            Transaction tx(
                jTx["sender"],
                jTx["receiver"],
                jTx["amount"]
            );
            tx.status = (TxStatus)jTx["status"];
            txs.push_back(tx);
        }

        Block block(index, timestamp, txs, prevHash);
        block.hash = hash;

        chain.push_back(block);
    }
}