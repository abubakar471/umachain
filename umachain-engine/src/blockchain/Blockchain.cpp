#include "Blockchain.h"
#include <fstream>
#include <ctime>
#include <limits>
#include <sstream>
#include <iostream>

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
void Blockchain::saveToFile()
{
    std::ofstream file("blockchain.dat");

    for (auto &block : chain)
    {
        file << block.index << "\n";
        // ctime() timestamps include a trailing '\n'. Remove it so each field stays on one line.
        std::string ts = block.timestamp;
        if (!ts.empty() && ts.back() == '\n')
            ts.pop_back();
        file << ts << "\n";
        file << block.previousHash << "\n";
        file << block.hash << "\n";

        file << block.transactions.size() << "\n";

        for (auto &tx : block.transactions)
        {
            file << tx.sender << "\n";
            file << tx.receiver << "\n";
            file << tx.amount << "\n";
            file << (int)tx.status << "\n";
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
        file.ignore(std::numeric_limits<std::streamsize>::max(), '\n');

        std::getline(file, timestamp);
        std::getline(file, prevHash);
        std::getline(file, hash);
        int txCount = 0;
        if (!(file >> txCount)) {
            std::cerr << "[Blockchain] Failed to read txCount for block index " << index << ". Aborting load.\n";
            break;
        }

        // Basic sanity check to avoid absurd allocations from malformed files
        if (txCount < 0 || txCount > 1000000) {
            std::cerr << "[Blockchain] Suspicious txCount=" << txCount << " for block index " << index << ". Aborting load.\n";
            break;
        }

        file.ignore(std::numeric_limits<std::streamsize>::max(), '\n');

        std::vector<Transaction> txs;
        txs.reserve((size_t)std::min(txCount, 1000));

        bool parseError = false;
        for (int i = 0; i < txCount; i++)
        {
            std::string sender, receiver;
            double amount = 0.0;
            int statusInt = 0;

            std::getline(file, sender);
            std::getline(file, receiver);

            if (!(file >> amount)) {
                std::cerr << "[Blockchain] Failed to read amount for tx " << i << " in block " << index << ".\n";
                parseError = true;
                break;
            }
            if (!(file >> statusInt)) {
                std::cerr << "[Blockchain] Failed to read status for tx " << i << " in block " << index << ".\n";
                parseError = true;
                break;
            }

            file.ignore(std::numeric_limits<std::streamsize>::max(), '\n');

            Transaction tx(sender, receiver, amount);
            tx.status = (TxStatus)statusInt;

            txs.push_back(tx);
        }

        if (parseError) {
            std::cerr << "[Blockchain] Parse error while loading block " << index << ". Aborting load.\n";
            break;
        }

        std::getline(file, separator); // read "---"

        Block block(index, timestamp, txs, prevHash);
        block.hash = hash;

        chain.push_back(block);
    }
}
