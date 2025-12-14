# compiling the http server, blockchain, block, transaction, wallet manager and crypto together in the build directory
1. first in terminal move to build directory inside the umachain-engine directory. there run this command

g++ -std=c++17 ..\src\server.cpp ..\src\blockchain\Blockchain.cpp ..\src\block\Block.cpp ..\src\transaction\Transaction.cpp ..\src\wallet\WalletManager.cpp ..\src\crypto\Crypto.cpp -o server.exe -lws2_32 -lssl -lcrypto -D_WIN32_WINNT=0x0A00 

2. after successfully compiled the server run the command while being inside the build directory
.\server.exe 2> server.log

# how to run the frontend client

1. in terminal go inside the client directory and install the packages
npm install

note: you will need to have node js installed in your system

2. after packages are successfully installed run the following command to successfully start the server.
npm run dev