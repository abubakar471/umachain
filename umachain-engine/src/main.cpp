#include "httplib.h"
#include <iostream>
#include <string>
#include "Blockchain.h"

Blockchain blockchain; 

int main(void){
    using namespace httplib;

    Server svr;

    svr.Get("/", [](const Request &req, Response &res){
        res.set_content("Hello world", "text/plain");
    });

    svr.Get("/chain", [](const httplib::Request &, httplib::Response &res)
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

    // Simple POST handler that echoes JSON or raw body
    svr.Post("/echo", [](const Request &req, Response &res){
        auto ct = req.get_header_value("Content-Type");
        if (ct.find("application/json") != std::string::npos) {
            res.set_header("Content-Type", "application/json");
            res.set_content(req.body, "application/json");
        } else {
            res.set_header("Content-Type", "text/plain");
            res.set_content(std::string("Received: ") + req.body, "text/plain");
        }
    });

    svr.set_logger([](const Request &req, const Response &res){
        std::cerr << req.method << " " << req.path << " -> " << res.status << "\n";
    });

    std::cout << "Starting server on http://localhost:8080" << std::endl;
    svr.listen("0.0.0.0", 8080);
}