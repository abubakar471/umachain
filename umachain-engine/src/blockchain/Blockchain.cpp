#include "Blockchain.h"
#include <fstream>
#include <ctime>

Blockchain::Blockchain(){
    loadFromFile();

    if(chain.empty()){
        chain.push_back(createGenesisBlock());
        saveToFile();
    }
}

Block Blockchain::createGenesisBlock(){
    // Constructor takes (index, data, previousHash)
    return Block(0, "Genesis Block", "0");
}