---
sidebar_position: 3
---

# Bank

## Overview

The bank module handles account balance transfers for Watchman. This module corresponds to the bank module from cosmos-sdk.

## Messages

### MsgSend

`MsgSend` handles transfer between accounts in Watchman. Here is a structure for transaction message:

```ts
// MsgSend - high-level transaction of the coin moduletype
MsgSend struct {
FromAddress types.HeimdallAddress `json:"from_address"`
ToAddress types.HeimdallAddress `json:"to_address"`
Amount types.Coins `json:"amount"`
}
```

### MsgMultiSend

`MsgMultiSend` handles multi transfer between account for Watchman.

```java
// MsgMultiSend - high-level transaction of the coin moduletype
MsgMultiSend struct {
Inputs []Input `json:"inputs"`
Outputs []Output `json:"outputs"`
}
```

## Parameters

The bank module contains the following parameters:

| Key         | Type | DefaultValue |
| :---------- | :--- | :----------- |
| sendenabled | bool | true         |

## CLI commands

### Send balance

Following command will send 1000 dojima tokens to mentioned address

```
wmcli tx bank send <address> 1000dojima --chain-id <chain-id>
```
