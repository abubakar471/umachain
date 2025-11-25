#include "Block.h"
#include <iostream>
#include <string>
#include <sstream>
#include <functional> // for std::hash

// Block class's constructor definition, we have declared the constructor of Block class in Block.h
Block::Block(int idx, const std::string &time, const std::vector<Transaction> &txs, const std::string &prevHashValue)
{
    index = idx;
    timestamp = time;
    transactions = txs;
    previousHash = prevHashValue;
    nonce = 0;

    // get timestamp in miliseconds
    // timestamp = std::chrono::system_clock::now().time_since_epoch().count();

    hash = calculateHash();
}

// hash generator using std::hash
std::string Block::calculateHash()
{
    std::stringstream ss;

    // creating the raw input string with the block's data
    ss << index << timestamp << previousHash << nonce;

    // add all transactions into the hash input
    for(auto &tx : transactions){
        ss << tx.sender << tx.receiver << tx.amount; 
    }

    std::hash<std::string> hasher;
    /*
        size_t is an unsigned integer type.
        and unsigned, guaranteed to be large enough to hold the size of the largest possible object on the platform. Typical widths: 32-bit on 32-bit systems, 64-bit on 64-bit systems.
    */
    size_t hashValue = hasher(ss.str());

    return std::to_string(hashValue);
}

// our custom proof of work algorithm
// the hash must start with "diffiuclty" number of zeros, that's it
void Block::mineBlock(int difficulty)
{
    std::string target(difficulty, '1'); // e,g if difficulty = 3, then target = "000"
    
    while (hash.substr(0, difficulty) != target)
    {
        // std::cout << "new hash : " << hash << std::endl;
        nonce++;
        hash = calculateHash();
    }
}