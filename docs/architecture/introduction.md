
# Hermes Chain

## Introduction

Hermes chain is responsible for managing 
- Native token liquidity from all blockchains
- Staking Management
- Rewards management for liquidity providers
- Validators
- Slashing mechanisms.
- Fees Collection e.t.c

Main modules inside Hermes are:
 - Narada
 - Threshold signature scheme
 - Fortunas
 - Sors

### Narada

Narada is responsible for managing chain clients functionality to listen hermes blockchain events like swapping of arweave -> ethereum, arweave -> dojima and other custom messages and messages forwarded to dojima chain e.t.c

1. Chain clients
2. Observer
3. Signer

- **Chain clients** 

	Chain clients are responsible for reading events from different blockchains. Client will listen to hermes wallet address transactions as destination/target address. It contains only necessary logic to perform operations. Currently supported chain clients are arweave, bitcoin, binance, cosmos, ethereum, solana, polkadot.

- **Observer**

     Observer is responsible for transmitting observed events by chain clients. 

- **Signer**
     Signer is responsible for signing transactions onto the destination chain that received from the Hermes chain.

### Threshold signature scheme ( TSS )

Threshold signature scheme is responsible for securing the liquidity which is being held in the Hermes chain. Liquidity is holded by fortunas vaults. Dojima has written many articles on tss, please checkout https://medium.com/@dojimanetwork for more on tss. Each chain supports certains signature mechanism for signing wallet transactions like `secp256k1` curve of `ECDSA` algorithm for `ethereum`, `binance`, `cosmos`, `binance` and `RSA` for `arweave` and `ed25519` for `solana`, `polkadot`. Currently dojima has written tss for `ecdsa`, `rsa`, `ed25519` signature algorithms.

### Fortunas

Fortunas are responsible for holding liquidity of multiple tokens at single place which are generated by dojima tss. Security of liquidity depends on the number of validators managed by tss. When swapping of tokens are involved ( binance -> arweave), ⅔ of validators will sign to release the desired token amount on the destination chain requested for swap received from the hermes chain. Since tss is a slow process, for small swap amounts is a drawback. To overcome this, Sors is introduced.

### Sors

Sors are responsible for sending small amounts of requested swap tokens onto the destination chain. Each validator can be a sors. Validator will be assigned 25% of total amount supported tokens based on validator staked amount.
