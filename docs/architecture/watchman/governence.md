---
sidebar_position: 4
---
# Governence

## Overview

Watchman governance works exactly the same as Cosmos-sdk `x/gov` module.
[https://docs.cosmos.network/master/modules/gov/](https://docs.cosmos.network/master/modules/gov/)

In this system, holders of the native staking token of the chain can vote on proposals on a `1 token = 1 vote` basis. Next is a list of features the module currently supports:

- **Proposal submission:** Validators can submit proposals with a deposit. Once the minimum deposit is reached, proposal enters voting period. Valdiators that deposited on proposals can recover their deposits once the proposal is rejected or accepted.

- **Vote:** Validators can vote on proposals that reached MinDeposit

There are deposit period and voting period as params in `gov` module. Minimum deposit has be achieved before deposit period ends, otherwise proposal will be automatically rejected.

Once minimum deposits reached within deposit period, voting period starts. In voting period, all validators should vote their choices for the proposal. After voting period ends, `gov/Endblocker.go` executes `tally` function and accepts or rejects proposal based on `tally_params — quorum`, `threshold` and `veto`.

Source: [https://github.com/dojimanetwork/watchman/blob/master/gov/endblocker.go](https://github.com/dojimanetwork/watchman/blob/master/gov/endblocker.go)

There are different types of proposals that can be implemented in Watchman but as of now, it supports only one proposal:

- Param change proposal

### Param change proposal

Using this type of proposal, validators can change any `params` in any `module` of Watchman. Example: change minimum `tx_fees` for the transaction in `auth` module. When the proposal gets accepted, it automatically changes the `params` in Watchman state. No extra TX is needed.

## CLI commands

### Query gov params

wmcli query gov params --trust-node

This shows all params for governance module

```json
voting_params:
   voting_period: 48h0m0
stally_params:
   quorum: "334000000000000000"
   threshold: "500000000000000000"
   veto: "334000000000000000"
deposit_parmas:
   min_deposit:
   - denom: dojima
   amount:
     i: "10000000000000000000"
     max_deposit_period: 48h0m0s

```

### Submit proposal

```jsx
wmcli tx gov submit-proposal \
--validator-id 1 param-change proposal.json \
--chain-id <watchman-chain-id>
```

proposal.json is a file which includes proposal in json format.

```json
{
"title": "Auth Param Change",
"description": "Update max tx gas",
"changes": [
   { "subspace": "auth",
   "key": "MaxTxGas",
   "value": "2000000"
   }
],
"deposit": [
   { "denom": "dojima",
     "amount": "1000000000000000000"
    }
 ]
 }
```

### Query proposal

To query all proposals

```text
wmcli query gov proposals --trust-node
```

To query particular proposal

```text
wmcli query gov proposals 1 --trust-node
```

### Vote on proposal

To vote on a particular proposal

```text
wmcli tx gov vote 1 "Yes" --validator-id 1 --chain-id <watchman-chain-id>
```

Proposal will be automatically tallied after voting period.

## REST APIs

| Name                           | Method | Endpoint                         |
| :----------------------------- | :----- | :------------------------------- |
| Get all proposals              | Get    | /gov/proposals                   |
| Get proposal details           | Get    | /gov/proposals/proposal-id       |
| Get all votes for the proposal | Get    | /gov/proposals/proposal-id/votes |
