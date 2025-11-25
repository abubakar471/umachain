#include "Transaction.h"

Transaction::Transaction(const std::string &from, const std::string &to, int amt){
    sender = from;
    receiver = to;
    amount = amt;
}