#include <iostream>
#include <string>
#include "httplib.h"
#include "Blockchain.h"

Blockchain blockchain; // global blockchain instance or object

int main()
{

    httplib::Server server;

    // GET /chain -> returns full chain
    server.Get("/chain", [](const httplib::Request &, httplib::Response &res)
               {
        std::string output = "";
        for (auto &block : blockchain.getChain()) {
            output += "Index: " + std::to_string(block.index) + "\n";
            output += "Timestamp: " + block.timestamp + "\n";
            output += "Transactions:\n";
            for (const auto &tx : block.transactions) {
                output += "  " + tx.sender + " -> " + tx.receiver + " : " + std::to_string(tx.amount) + "\n";
            }

            output += "PrevHash: " + block.previousHash + "\n";
            output += "Hash: " + block.hash + "\n";
            output += "-------------------------\n";
        }
        res.set_content(output, "text/plain"); 
    });

    // POST /add-transaction → add tx to mempool
    server.Post("/add-transaction", [](const httplib::Request &req, httplib::Response &res)
                {
        auto sender = req.get_param_value("sender");
        auto receiver = req.get_param_value("receiver");
        auto amountStr = req.get_param_value("amount");

        double amount = std::stod(amountStr);

        Transaction tx(sender, receiver, amount);
        blockchain.addTransaction(tx);

        res.set_content("Transaction added successfully", "text/plain"); });

    // GET /mine → mine new block
    server.Get("/mine", [](const httplib::Request &, httplib::Response &res)
               {
        bool mined = blockchain.minePendingTransactions("miner-wallet");

        if (mined)
            res.set_content("Block mined successfully", "text/plain");
        else
            res.set_content("No transactions to mine", "text/plain"); });

    // GET /balance/:wallet
    server.Get(R"(/balance/(.*))", [](const httplib::Request &req, httplib::Response &res)
               {
        std::string wallet = req.matches[1];
        double balance = blockchain.getBalance(wallet);

        res.set_content("Balance: " + std::to_string(balance), "text/plain"); });

    std::cout << "Server running on http://localhost:8080\n";
    server.listen("0.0.0.0", 8080);

    return 0;
}