# Transaction
It is the atomic unit of blockchain technology. A transaction generally means when someone sends or transfer something to someone else. So, it is basically a class which gives you the ability to create transaction objects.

As, per the above context we can get the idea preety straight that in a transaction object we need some mandatory fields.

1. sender - who is sending or transfering

2. receiver - who is receiving 

3. amount - how much he is receiving

4. timestamp - when this transaction took place

5. status - what is the status of the transaction (e.g. PENDING=0, CONFIRMED=1)

6. id - a unique key to identify each transaction respectively

7. signatureBase64 = signature of the canonical string (e.g. sender|receiver|amount|timestamp = ot/hHmiOtUxFjL6D3xJ6NTw8CHuSLwDfP0Dbnc10mQUv3cwfvwx4qk7Wyebk/sn8DOPK9UprkjieJ0NkSvOE/Q==)

8. pubKeyPem - sender's public key in PEM format (e.g. "-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEgdLB/VWXLvUSmv/Dkp5S7yH3rFko\nwxvvClZ3IIRANqc8UDUSHFT4ovlJombbusqXBcZETgAP9OiVQkUJ1jhYUA==\n-----END PUBLIC KEY-----")

<br>
Helper functions for Transaction Class <br><br>

- toJSON() - converts a tx object into a json object and returns the json object
- fromJSON() - converts a json object into a transaction object and returns the transaction object
- generateId() - generates a unique id so that each transaction can be identified individually with their respective id. so, it returns a unique string only.
<br>

### A sample of transaction in a blockchain
    {
        amount": 100.0,
        "id": "b86a9a81ff0fcd482a05ef3e0f85deae9d4ad6c4737ea648728d8b81943818ad",
        "receiver": "WALLET_256362",
        "sender": "WALLET_459453",
        "status": 1,
        "timestamp": 1765531149446
    }

<br><br>

# Block 
Block is the 2nd most important component of a blockchain. A block is used to store multiple transaction inside of it.

At first a block is formed by taking out some transaction from the mempool or the memorypool (where pending transactions are lying which not yet verified by a miner).

So, in a Block class we will again see some mandatory field. These are -

1. index - the index number of the block.

2. timestamp - when was the block formed or created

3. transactions - it is a vector that stores some transactions for that block, these transactions will be later verified when the block will be mined by the miner.

4. previousHash - the previous block's hash. it is necessary as each block depends on its previous block. as in blockchain each block is connected with its previous block so it ensures security as nobody can inject another unverified or corrupt block at any moment. so, its just the previous block's hash

5. hash - a cryptographic hash for this block and this will act as previous hash for the next block of the blockchain.

7. nonce - it is a integer value and nonce means number used once. a nonce in a block class is used to store the count at which a ideal hash is found for the block. 

<br>
Helper functions for the Block class <br><br>

- calculateHash() - returns a cryptographic hash string that is generated using a canonical string <br>(e.g. index|timestamp|previousHash|nonce) 
- mineBlock() - this function does the PoW (proof-of-work) for a block and this function is called by a miner or the node. this function returns nothing but inside it sets a ideal hash and sets the nonce's value at which iteration the ideal hash was found.
- toJSON() - converts a block object into a json object and returns the json object
- fromJSON() - converts a json object into a block object and returns the transaction object

### A sample of block in a blockchain
    {
        "hash": "1111164857134047581",
        "index": 4,
        "nonce": 34769,
        "previousHash": "17880406517502953648",
        "timestamp": "Fri Dec 12 15:19:18 2025",
        "transactions": [
            {
                "amount": 100.0,
                "id": "b86a9a81ff0fcd482a05ef3e0f85deae9d4ad6c4737ea648728d8b81943818ad",
                "receiver": "WALLET_256362",
                "sender": "WALLET_459453",
                "status": 1,
                "timestamp": 1765531149446
            },
            {
                "amount": 2.0,
                "id": "42aebc0cefe35875050f1045e43ab982e71c3fda42fdbee7acf0c2bda2919156",
                "receiver": "ab",
                "sender": "SYSTEM",
                "status": 1,
                "timestamp": 1765531158902
            }
        ]
    }

<br><br>

# Blockchain
A blockchain is a chain of blocks. In simple words blockchain stores block inside of it and provides functionality to interact with the blocks. 

As you guessed, in a blockchain there is also some key fields availble. Let's look at those in a glace.

1. chain - a vector that stores blocks with confirmed status transactions. blocks inside the chain vector means those blocks are already mined and now inside the real blockchain.

2. mempool - a vector that stores transactions with pending status. transactions inside the mempool are not yet put inside a block, they are there for the miners. the miners will come take these transaction create a block with them and then mine the created block and then add the verified block to the chain vector.

<br><br>

Helper functions for Blockchain
- createGenesisBlock() - This creates the very first block of the blockchain, and this block is created by the blockchain system itself. No miner is needed to create this block. Also, this function is called only when there is not a single block inside the chain vector.

- addTransaction() - adds a transaction with pending status to the mempool vector.

- getLatestBlock() - returns the last verified block from the chain vector.

- minePendingTransactions() - takes out transactions that are in mempool vector, creates a block with those pending transactions and mine them, change the status from pending to confirmed for those transactions and add the block to the blockchain and clears the mempool.

- getBalance() - returns a double value based on transactions inside the chain vector for a wallet address

- getEffectiveBalance() - returns a double value based on transactions both inside the chain vector and the mempool vector for a wallet address

- validateTransaction() - returns True or False, when you pass a transaction inside of it as a parameter. it checks the balance of sender in that transaction, in both mempool and chain, whether he has enough balance to do that transaction. thus it secures the double spending issue and it uses the getEffectiveBalance function for that.

- isValidChain() - this function is for the node to use, to check whether the current blockchain it is operating on is a valid one. and it also returns a boolean value.

- getChain() - retuns the chain vector.

- getMempool() - returns the mempool vector.

- getTransactionsForWallet() - it returns a vector of transaction based on the wallet address passed as the parameter.

- getTransactionById() - returns a transaction based on a transaction id passed as a parameter.

- getLatestTransactions() - returns a vector of latest 20 (by default) or more transactions based on the timestamp of transaction.

- getBlockByIndex() - returns a block by the index count of a block, passed as a parameter.

- getBlocks() - returns a vector of Blocks. By default it returns 20 blocks and the limit is configurable with parameter.

- addConfirmedTransaction() - it adds a block directly to the chain vector by setting the status of each transaction inside that block as confirmed and this function is called by the blockchain system, when users do buy/sell.

- saveToFile() and saveToJSON() - the saveToFile function calls the saveToJSON inside of it and directly. where the saveToJSON saves blocks insides the blockchain.json file.

- loadFromFile() and loadFromJSON() - the loadFromFile function calls the loadFromJSON inside of it directly. where the loadFromJSON loads json data from the blockchain.json and push it back into the chain vector.

- <b>highlight</b> - why used 2 same sort of functions for saving and loading from file. like for saving used saveToFile and inside calling saveToJSON and for loading used loadFromFile and inside calling loadFromJSON? well, the reason is, in future we will implement multi-node system in our project, and their we will need to broadcast our data to other nodes and save file there also in real time. the reason was this, so we can do multiple saving and loading from a single working point or branch.

<br><br>

### Sample of a complete blockchain inside the blockchain.json file

    [   
        {
            "hash": "11111648501754378741",
            "index": 0,
            "nonce": 27298,
            "previousHash": "0",
            "timestamp": "2025-25-11",
            "transactions": []
        },
        {
            "hash": "554420524442314698",
            "index": 1,
            "nonce": 0,
            "previousHash": "11111648501754378741",
            "timestamp": "Fri Dec 12 15:18:21 2025",
            "transactions": [
                {
                    "amount": 500.0,
                    "id": "aba97d23101d02c9b695b75ca6e531a2163a19aca5effe6459d4944a2c1a211e",
                    "receiver": "WALLET_256362",
                    "sender": "FIAT",
                    "status": 1,
                    "timestamp": 1765531101093
                }
            ]
        }
    ]


<br><br>

# WalletManager

The WalletManager class is used to store and interact with users wallet and enable the real usecase of cryptocurrency inside the blockchain. 

It unlocks the feature for users to transfer, buy, sell and get their wallet's balance info on top of the blockchain.

WalletManager class's member variables and helper functions are described below in details-

1. userToWallet - it is an unordered map and this is used to store users wallet address against their userId, in our case, we get the userId from the frontend as clerk's userId

2. walletBalances - it is also an unordered list that stores users balances against their wallet address or wallet id (both are same).

3. walletPublicKey - it is an unordered list that stores the publicKeyPEM of against their wallet address. storing public id is necessary as this is used for verifying a transaction beforing adding to the mempool vector and authorize an user.

<br><br>

Helper functions for WalletManager

- generateWalletId() - this generate a new wallet id or wallet address if there is no wallet address is found for a user id. and this is returns a unique string as the wallet address or wallet id.

- walletExists() - this takes a walletId as a parameter and checks whether a walletId exists on the wallets.json file. this returns a boolean value.

- getOrCreateWallet() - it takes a userId as a parameter and checks the wallets.json file whether any wallet id is created for that user id. if it found the wallet id then returns the wallet id string otherwise creates one and returns the newly created wallet id.

- getWallet() - this takes a userId as a parameter and returns the wallet id from the wallets.json file.

- getBalance() - it returns a double value based on the paramter passed inside of it, the parameter is the walletId

- updateBalance - it takes two parameter, one is the walletId and the other is the amount to update. it updates the balance for the passed down walletId. amount can be positive or negative value.

- bindPublicKeyToWallet() - it takes two parameter one is the walletId and the other is pubKeyPem. it write the publicKeyPem against the walletId inside the wallets.json file if it is not already exist for that walletId. and afterwards returns the walletId.

- getPublicKey() - it takes a single parameter which is the walletId and returns the pubKeyPem from the wallets.json file if it found one otherwise returns a empty string.

- saveToFIle() - this saves the current instances of all userToWallet, walletBalances, walletPublicKey map's data to the wallet.json file.

- loadFromFile() - it loads data from the wallet.json file and put data in all three maps, those are userToWallet, walletBalances and walletPublicKey.

<br><br>

### Sample of wallets.json 

    {
        "balances": {
            "SYSTEM": -2.0,
            "WALLET_621482": 2.0,
            "WALLET_716470": 150.0,
            "WALLET_900386": 30.0
        },
        "pubkeys": {
            "WALLET_716470": "-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE475Ar0H1NmDF0FQ94WX1AXEclqK6\nJLeLLber5z/8iL4bTFFL20mSnVt82yBdowIO547/n0POiwuhErDZRH3p1Q==\n-----END PUBLIC KEY-----",
            "WALLET_900386": "-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEkSs8XNSsdKjZG7u4gRaqrN8x71iP\n1bs4l0DRUuHY3wLQwoRytP7Tq7MwT/jkMdoWTiThQKhYaWSqj5e87DMRLQ==\n-----END PUBLIC KEY-----"
        },
        "users": {
            "user_35uZaxOuLgZIqJVhDHhrdhqjfCs": "WALLET_900386",
            "user_36FJRn63DR7Qy4SCVBaBjWnFj1S": "WALLET_716470"
        }
    }