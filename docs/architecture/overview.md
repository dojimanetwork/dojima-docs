---
sidebar_position: 1
---
# Overview

### Dojima Architecture

<!-- ![medium](/img/medium.png)

Dojima Network is powered by three main components working together:

- **BULLDOG:** Bulldog is the EVM based Buffer zone, built to enable cross-chain exchange, as well as to build complex cross-chain Decentralized Applications. This is the component where all the tokens and contracts reside and interact with each other.

- **WATCHMAN:** Watchman is a Proof of Stake based Byzantine Fault Tolerant state replicating machine, built to securely process and transfer cross-chain data. This component makes all your cross chain transfers safer. Always be assured there is a watchman, guarding your tokens .

- **BRIDGE:** This is the layer responsible for detecting and relaying events between different chains configured in the system.This is one of the main processes performed by POS based Validators.

:::info
And one more thing to state here is that Arweave is used as a backup layer for all of Dojima networks transactions at regular intervals, thus making the dojima network more secure, immutable and permanent.
::: -->

Dojima Network is a multi-layer architecture. 

It consists of 2 blockchains working together in a decentralised manner with all other blockchains to both fetch liquidity and act as a cross-chain platform for developers to develop cross-chain applications.

1. Hermes Layer : built on top of Cosmos SDK and tendermint.

2. DojimaChain Layer: middle ground layer where developers can deploy applications and access hermes layer to get connected to all chains.

We developed a buffer layer on top of cosmos sdk and tendermint which is connected to all major blockchains and maintains liquidity pools to hold liquidity of native tokens and other tokens of major blockchain platforms. The liquidity data will be signed by all validators at every end of the block and supplied to contracts on top of the middle ground dojima blockchain to be accessed by smart contracts built by crosschain dapp developers.

Let's go in depth on the architecture of Dojima Network.

#### Hermes Layer

<!-- Add Image -->


<!-- <iframe width="100%" height="480px" src="https://www.youtube.com/embed/HYy3N7E0qSw" title="Dojima Demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
