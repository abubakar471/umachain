#include <iostream>
#include <string>
#include "../include/httplib.h"
#include "../include/json.hpp"
#include "./blockchain/Blockchain.h"

Blockchain blockchain; // global blockchain instance or object

int main()
{

    httplib::Server server;

    // GET /chain -> returns full chain
    server.Get("/chain", [](const httplib::Request &, httplib::Response &res)
               {
        nlohmann::json jChain = nlohmann::json::array();

        for (auto &block : blockchain.getChain())
        jChain.push_back(block.toJSON());

        res.set_content(jChain.dump(4), "application/json"); });

    // POST /add-transaction → add tx to mempool
    server.Post("/add-transaction", [](const httplib::Request &req, httplib::Response &res)
                {
        auto sender = req.get_param_value("sender");
        auto receiver = req.get_param_value("receiver");
        auto amountStr = req.get_param_value("amount");

        double amount = std::stod(amountStr);

        Transaction tx(sender, receiver, amount);
        blockchain.addTransaction(tx);

        // return a simple JSON object confirming the operation
        nlohmann::json response = {
            {"success", true},
            {"message", "Transaction added successfully"},
        };

        res.set_content(response.dump(), "application/json"); });

    // GET /mine → mine new block
    server.Get("/mine", [](const httplib::Request &req, httplib::Response &res)
               {
                   auto miner_address = req.get_param_value("miner_address");
                   bool mined = blockchain.minePendingTransactions(miner_address);

                   nlohmann::json response;

                   if (mined){
                       response = {
                           {"success", true},
                           {"message", "Block mined successfully."},
                       };

                    res.set_content(response.dump(), "application/json");
                   }
                    
                   else
                   {
                       response = {
                           {"success", false},
                           {"message", "No transaction found to mine."},
                       };

                       res.set_content(response.dump(), "application/json");
                   } });
    // GET /balance/:wallet
    server.Get(R"(/balance/(.*))", [](const httplib::Request &req, httplib::Response &res)
               {
        std::string wallet = req.matches[1];
        double balance = blockchain.getBalance(wallet);
        
        nlohmann::json response = {
            {"success", true},
            {"wallet_address", wallet},
            {"balance", balance},
        };

        res.set_content(response.dump(), "application/json"); });

    server.Get("/mempool", [](auto &, auto &res)
               {
        nlohmann::json jChain = nlohmann::json::array();

        for (auto &tx : blockchain.getMempool())
        jChain.push_back(tx.toJSON());

        res.set_content(jChain.dump(4), "application/json"); });

    std::cout << "Server running on http://localhost:8080\n";
    server.listen("0.0.0.0", 8080);

    return 0;
}