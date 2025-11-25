g++ -std=c++17 -I src/crypto -c src/crypto/Crypto.cpp -o Crypto.o
g++ -std=c++17 -I src/crypto -c src/test_crypto.cpp -o test_crypto.o
g++ test_crypto.cpp -I ./crypto -o test-crypto -lcrypto -lssl;   

g++ -std=c++17 -I./src -I/usr/local/include test_crypto.cpp src/crypto/Crypto.cpp -o test_crypto -lcrypto -lssl


## compiling Block.cpp with test_block.cpp
g++ -std=c++17 -I./src test_block.cpp src/block/Block.cpp -o test_block; ./test_block.exe