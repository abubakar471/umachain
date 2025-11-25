#ifndef BLOCK_H
#define BLOCK_H

#include <string>

class Block
{
public:
    int index;
    long timestamp;
    std::string data;
    std::string previousHash;
    std::string hash;
    int nonce;

    // Constructor declaration (defined in Block.cpp)
    Block(int idx, const std::string &data, const std::string &prevHash);

    std::string calculateHash();
    void mineBlock(int difficulty);
};

#endif