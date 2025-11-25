#include "Transaction.h"


Transaction::Transaction(const std::string &from, const std::string &to, double amt){
    sender = from;
    receiver = to;
    amount = amt;
    status = TxStatus::PENDING;
}