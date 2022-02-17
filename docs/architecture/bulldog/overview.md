---
sidebar_position: 1
---

# Overview

## Bulldog

The Bulldog (Buffer zone) or the Block Producer implementation is basically the sidechain operator. The sidechain VM is EVM-compatible. Currently, it is a basic Geth implementation with custom changes done to the consensus algorithm. However, this will be built from the ground up to make it lightweight and focused.

Block producers are chosen from the Validator set and are shuffled using historical block hashes for the same purpose. However, we are exploring sources of randomness for this selection.

Bulldog is our Block producer layer, which in sync with Watchman selects the producers and verifiers and makes sure that the selection is completely random reduicing chances of collision between validators.
