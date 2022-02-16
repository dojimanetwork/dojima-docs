---
sidebar_position: 8
---

# Clerk 

## Overview

Clerk modules manage generic state-sync from All chains to Bulldog chain. Watchman agrees on state sync, which is initiated on different chains using this module

## Messages

### MsgEventRecord

`MsgEventRecord` transaction is responsible for validating events from diffrent chains and storing the state on Watchman for Bulldog to use.

Handler for this transaction validates for any given `msg.TxHash`. It throws `Older invalid tx found` error if trying to process the transaction more than once.

Here is the structure for the transaction message:

```
// MsgEventRecord - state msg
type MsgEventRecord struct { 
      From Address `json:"from"` 
      TxID TxID `json:"tx_hash"` 
      ID uint64 `json:"id"` 
      ChainID string `json:"bor_chain_id"`
}
```
### CLERK MODULES

Each Blockchain attached to Dojima network has a dedicated Clerk Module designed specific to the chain to process the events received from different chains.

| Chain | Clerk Module |
| :--- | :--- |
| Ethereum | Clerk |
| Arweave | Arclerk |
| Solana | SolClerk |
| Polkadot | PolClerk |
| Binance Smart Chain | Bsc Clerk |

These modules are updated as new chains are attached to Dojima Network.