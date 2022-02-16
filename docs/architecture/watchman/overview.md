---
sidebar_position: 1
---

<!-- @format -->

# Overview

## Watchman

Watchman is the heart of the Dojima Network. It manages validators, block producer selection, the state-sync mechanism, oracle and relayer service between Dojima and other networks.

It uses the Cosmos-SDK and a forked version of Tendermint, Tendermint source:
[https://github.com/dojimanetwork/tendermint](https://github.com/dojimanetwork/tendermint).

Watchman removes some of the modules from Cosmos-SDK, but mostly it uses a customised version of it - but follows the same pattern
