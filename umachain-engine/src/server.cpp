#include <iostream>
#include <string>
#include "../include/httplib.h"
#include "../include/json.hpp"
#include "./blockchain/Blockchain.h"
#include "./wallet/WalletManager.h"

WalletManager walletManager;

Blockchain blockchain; // global blockchain instance or object

int main()
{

    httplib::Server server;
    std::string CLIENT_URL = "http://localhost:3000";

    // CORS helper: use CLIENT_URL for more restrictive policy in development
    auto set_cors = [&](httplib::Response &res)
    {
        res.set_header("Access-Control-Allow-Origin", CLIENT_URL.c_str());
        res.set_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.set_header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    };

    // Preflight handler for any path
    server.Options(R"(/.*)", [&](const httplib::Request & /*req*/, httplib::Response &res)
                   {
        set_cors(res);
        res.status = 200;
        res.set_content("", "text/plain"); });

    // GET /chain -> returns full chain
    server.Get("/chain", [&](const httplib::Request &, httplib::Response &res)
               {
        nlohmann::json jChain = nlohmann::json::array();

        for (auto &block : blockchain.getChain())
            jChain.push_back(block.toJSON());

        set_cors(res);
        res.set_content(jChain.dump(4), "application/json"); });

    // POST /add-transaction → add tx to mempool
    server.Post("/add-transaction", [&](const httplib::Request &req, httplib::Response &res)
                {
        auto sender = req.get_param_value("sender");
        auto receiver = req.get_param_value("receiver");
        auto amountStr = req.get_param_value("amount");
        auto sender_user_id = req.get_param_value("sender_user_id");

        double amount = std::stod(amountStr);

        if(amount > walletManager.getBalance(sender)){
                   nlohmann::json response = {
            {"success", false},
            {"message", "Insufficient funds"},
            };

            set_cors(res);
            return res.set_content(response.dump(), "application/json"); 
        }


         if(!walletManager.walletExists(sender) || !walletManager.walletExists(receiver)){
                   nlohmann::json response = {
            {"success", false},
            {"message", "Invalid Wallet Id"},
            };

            set_cors(res);
            return res.set_content(response.dump(), "application/json"); 
        }


        Transaction tx(sender, receiver, amount);
        blockchain.addTransaction(tx);

        // return a simple JSON object confirming the operation
        nlohmann::json response = {
            {"success", true},
            {"message", "Transaction added successfully"},
        };

        set_cors(res);
        return res.set_content(response.dump(), "application/json"); });

    // GET /mine → mine new block
    server.Get("/mine", [&](const httplib::Request &req, httplib::Response &res)
               {
                   auto miner_address = req.get_param_value("miner_address");
                   bool mined = blockchain.minePendingTransactions(miner_address, walletManager);

                   nlohmann::json response;

                    if (mined){
                       response = {
                           {"success", true},
                           {"message", "Block mined successfully."},
                       };

                    set_cors(res);
                    res.set_content(response.dump(), "application/json");
                   }
                    
                   else
                   {
                       response = {
                           {"success", false},
                           {"message", "No transaction found to mine."},
                       };


                              set_cors(res);
                              res.set_content(response.dump(), "application/json");
                   } });
    // GET /balance/:wallet
    server.Get(R"(/balance/(.*))", [&](const httplib::Request &req, httplib::Response &res)
               {
        std::string wallet = req.matches[1];
        double balance = blockchain.getBalance(wallet);
        
        nlohmann::json response = {
            {"success", true},
            {"wallet_address", wallet},
            {"balance", balance},
        };

        set_cors(res);
        res.set_content(response.dump(), "application/json"); });

    server.Get("/mempool", [&](auto &, auto &res)
               {
        nlohmann::json jChain = nlohmann::json::array();

        for (auto &tx : blockchain.getMempool())
        jChain.push_back(tx.toJSON());

        set_cors(res);
        res.set_content(jChain.dump(4), "application/json"); });

    server.Post("/wallet/init", [&](const httplib::Request &req, httplib::Response &res)
                {
        auto userId = req.get_param_value("user_id");
        std::cout << "user id : " << userId << std::endl;

        std::string wallet = walletManager.getOrCreateWallet(userId);
        double balance = walletManager.getBalance(wallet);

        // std::string json = "{ \"wallet\": \"" + wallet +
        //                "\", \"balance\": " + std::to_string(balance) + " }";
       nlohmann::json response;

       response = {
        {"success", true},
        {"wallet", wallet},
        {"balance", balance}
       };

    set_cors(res);
    res.set_content(response.dump(), "application/json"); });

    server.Get(R"(/wallet/balance/(.*))", [&](const httplib::Request &req, httplib::Response &res)
               {
        auto wallet = req.matches[1];
        double balance = walletManager.getBalance(wallet);

        nlohmann::json response;

        response = {
            {"success", true},
            {"balance", balance}
        };

        set_cors(res);
        res.set_content(response.dump(), "application/json"); });

    server.Post("/transaction/send", [&](const httplib::Request &req, httplib::Response &res)
                {
    std::string sender = req.get_param_value("sender");
    std::string receiver = req.get_param_value("receiver");
    double amount = std::stod(req.get_param_value("amount"));

    Transaction tx(sender, receiver, amount);
    blockchain.addTransaction(tx);

    nlohmann::json response = {
        {"success", true},
        {"message", "Transaction added to pending"},
        {"tx", {
            {"sender", sender},
            {"receiver", receiver},
            {"amount", amount},
            {"status", "PENDING"}
        }}
    };

    set_cors(res);
    res.set_content(response.dump(), "application/json"); });

    std::cout << "Server running on http://localhost:8080\n";
    server.listen("0.0.0.0", 8080);

    return 0;
}