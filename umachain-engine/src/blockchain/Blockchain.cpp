#include "Blockchain.h"
#include <fstream>
#include <ctime>

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
    return Block(0, "2025-25-11", "Genesis Block", "0");
}

Block Blockchain::getLatestBlock()
{
    return chain.back();
}

void Blockchain::addBlock(const std::string &data)
{
    int newIndex = chain.size();

    // get current time
    time_t now = time(0);

    std::string timestr = ctime(&now);

    Block newBlock(newIndex, timestr, data, getLatestBlock().hash);
    
    // proof of work happening here before adding a block to the blockchain
    newBlock.mineBlock(difficulty);

    chain.push_back(newBlock);

    saveToFile();
}

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

// save to blockchain.dat
void Blockchain::saveToFile()
{
    std::ofstream file("blockchain.dat");

    for (auto &block : chain)
    {
        file << block.index << "\n";
        file << block.timestamp;
        file << block.data << "\n";
        file << block.previousHash << "\n";
        file << block.hash << "\n---\n";
    }
}

void Blockchain::loadFromFile()
{
    chain.clear();

    std::ifstream file("blockchain.dat");
    if (!file.good())
        return;

    int index;

    std::string timestamp, data, prevHash, hash;
    std::string separator;

    while (file >> index)
    {
        file.ignore();
        std::getline(file, timestamp);
        std::getline(file, data);
        std::getline(file, prevHash);
        std::getline(file, hash);
        std::getline(file, separator); // read the --- separator line

        Block block(index, timestamp, data, prevHash);
        block.hash = hash;

        chain.push_back(block);
    }
}