g++ -std=c++17 -I src/crypto -c src/crypto/Crypto.cpp -o Crypto.o
g++ -std=c++17 -I src/crypto -c src/test_crypto.cpp -o test_crypto.o
g++ test_crypto.cpp -I ./crypto -o test-crypto -lcrypto -lssl;   

g++ -std=c++17 -I./src -I/usr/local/include test_crypto.cpp src/crypto/Crypto.cpp -o test_crypto -lcrypto -lssl


## compiling Block.cpp with test_block.cpp
g++ -std=c++17 -I./src test_block.cpp src/block/Block.cpp -o test_block; ./test_block.exe

# compiling the http server, blockchain, block, transaction together in the build directory
first in terminal move to build directory there run this command

g++ -std=c++17 ..\src\server.cpp ..\src\blockchain\Blockchain.cpp ..\src\block\Block.cpp ..\src\transaction\Transaction.cpp ..\src\wallet\WalletManager.cpp ..\src\crypto\Crypto.cpp -o server.exe -lws2_32 -lssl -lcrypto -D_WIN32_WINNT=0x0A00 

.\server.exe 2> server.log