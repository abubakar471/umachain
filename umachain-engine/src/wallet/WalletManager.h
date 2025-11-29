#pragma once
#include <string>
#include <unordered_map>
#include "../../include/json.hpp"

class WalletManager{
    private:
        std::unordered_map<std::string, std::string> userToWallet; // clerkId to walletId converter
        std::unordered_map<std::string, double> walletBalances; // wallet id to balances

        std::string filename = "../data/wallets.json";
        
        std::string generateWalletId();
        void saveToFile();
        void loadFromFile();

    public:
        WalletManager();
        bool walletExists(const std::string &walletId);
        std::string getOrCreateWallet(const std::string &userId);
        std::string getWallet(const std::string &userId);
        double getBalance(const std::string &walletId);
        void updateBalance(const std::string &walletId, double amount);
};