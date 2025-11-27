#include "WalletManager.h"
#include <fstream>
#include <random>
#include <iostream>

using json = nlohmann::json;

// constructor - to load wallet file
WalletManager::WalletManager(){
    loadFromFile();
}

// generate wallet id
std::string WalletManager::generateWalletId(){
    static std::mt19937 rng(std::random_device{}());
    std::uniform_int_distribution<int> dist(100000, 999999);

    return "WALLET_" + std::to_string(dist(rng));
}

// get existing or create new wallet
std::string WalletManager::getOrCreateWallet(const std::string &userId){
    if(userToWallet.count(userId)){
        return userToWallet[userId];
    }

    std::string newWallet = generateWalletId();
    userToWallet[userId] = newWallet;
    walletBalances[newWallet] = 0;

    saveToFile();

    return newWallet;
}


// get existing wallet
std::string WalletManager::getWallet(const std::string &userId){
    if(userToWallet.count(userId)){
        return userToWallet[userId];
    }

    return "";
}


// get wallet balance
double WalletManager::getBalance(const std::string &walletId){
    if(walletBalances.count(walletId)){
        return walletBalances[walletId];
    }

    return 0;
}

// update wallet balance
void WalletManager::updateBalance(const std::string &walletId, double amount){
    walletBalances[walletId] += amount;
    saveToFile();
}

// save to wallets.json
void WalletManager::saveToFile(){
    json j;

    j["users"] = userToWallet;
    j["balances"] = walletBalances;

    std::ofstream file(filename);
    
    file << j.dump(4);
}

// load from wallets.json
void WalletManager::loadFromFile(){
    std::ifstream file(filename);

    if(!file.good()) return;

    json j;

    file >> j;

    if(j.contains("users")){
        userToWallet = j["users"].get<std::unordered_map<std::string, std::string>>();
    }

     if(j.contains("balances")){
        walletBalances = j["balances"].get<std::unordered_map<std::string, double>>();
    }
}