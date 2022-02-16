---
sidebar_position: 7
---

<!-- @format -->

# Bor

**Overview**

Bor module handles span management on Watchman. Given Bulldog chain's current block number `n`, current span `span`, if `span.StartBlock <= n < span.EndBlock`, new span is proposed on Watchman by any validator.

## Messages

### MsgProposeSpan

Source:[https://github.com/dojimanetwork/watchman/blob/master/bor/handler.go](https://github.com/dojimanetwork/watchman/blob/master/bor/handler.go)

MsgProposeSpan sets the validators’ committee for a given span and stores a new span into Watchman state. Here is how this transaction chooses producers out of all validators:

```
// MsgProposeSpan creates msg propose span
type MsgProposeSpan struct {
     ID uint64 `json:"span_id"`
     Proposer hmTypes.HeimdallAddress `json:"proposer"`
     StartBlock uint64 `json:"start_block"`
     EndBlock uint64 `json:"end_block"`
     ChainID string `json:"bor_chain_id"`
}
```

1. It creates multiple slots based on validators' power. Example: A with power 10 will have 10 slots, B with power 20 with have 20 slots.

2. With all slots, `shuffle` function shuffles them using seed and selects first `producerCount` producers. bor module on Watchman uses ETH 2.0 shuffle algorithm to choose producers out of all validators. Each span n uses block hash of Ethereum (ETH 1.0) block `n` as `seed`. Note that slots based selection allows validators to get selected based on their power. The higher power validator will have a higher probability to get selected.
   Source:[https://github.com/dojimanetwork/watchman/blob/master/bor/selection.go](https://github.com/dojimanetwork/watchman/blob/master/bor/selection.go)

```
// SelectNextProducers selects producers for the next span by converting power to slots
// spanEligibleVals - all validators eligible for next spanfunc
SelectNextProducers(blkHash common.Hash, spanEligibleVals []hmTypes.Validator, producerCount uint64) (selectedIDs []uint64, err error) { if len(spanEligibleVals) <= int(producerCount) { for _, val := range spanEligibleVals { selectedIDs = append(selectedIDs, uint64(val.ID)) } return } // extract seed from hash seed := helper.ToBytes32(blkHash.Bytes()[:32]) validatorIndices := convertToSlots(spanEligibleVals) selectedIDs, err = ShuffleList(validatorIndices, seed) if err != nil { return } return selectedIDs[:producerCount], nil}// converts validator power to slotsfunc convertToSlots(vals []hmTypes.Validator) (validatorIndices []uint64) { for _, val := range vals { for val.VotingPower >= types.SlotCost { validatorIndices = append(validatorIndices, uint64(val.ID)) val.VotingPower = val.VotingPower - types.SlotCost } } return validatorIndices}

```

## Types

Here are the span details that Watchman uses:

```
// Span structure
type Span struct {
    ID uint64 `json:"span_id" yaml:"span_id"`
    StartBlock uint64 `json:"start_block" yaml:"start_block"`
    EndBlock uint64 `json:"end_block" yaml:"end_block"`
    ValidatorSet ValidatorSet `json:"validator_set" yaml:"validator_set"`
    SelectedProducers []Validator `json:"selected_producers" yaml:"selected_producers"`
    ChainID string `json:"bor_chain_id" yaml:"bor_chain_id"`
}
```

## Parameters

The Bor module contains following parameters

| Key            | Type   | Default value       |
| :------------- | :----- | :------------------ |
| SprintDuration | unit64 | 64                  |
| SpanDuration   | unit64 | 100\*SprintDuration |
| ProducerCount  | unit64 | 4                   |

## CLI commands

**Span propose tx**

```text
wmcli tx bor propose-span \
--start-block <start-block> \
--chain-id <watchman-chain-id>

```

**Query current span**

```
wmcli query bor span latest-span --chain-id <watchman-chain-id>
```

Expected output:

```
{
  "span_id":2,
  "start_block":6656,
  "end_block":13055,
  "validator_set":{
    "validators":[
      {
        "ID":1,
        "startEpoch":0,
        "endEpoch":0,
        "power":1,
        "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
        "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
        "last_updated":"",
        "accum":0
      }
    ],
    "proposer":{
      "ID":1,
      "startEpoch":0,
      "endEpoch":0,
      "power":1,
      "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
      "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
      "last_updated":"",
      "accum":0
    }
  },
  "selected_producers":[
    {
      "ID":1,
      "startEpoch":0,
      "endEpoch":0,
      "power":1,
      "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
      "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
      "last_updated":"",
      "accum":0
    }
  ],
  "bor_chain_id":"15001"
}
```

Query span by id

```
wmcli query bor span --span-id <span-id> --chain-id <watchman-chain-id>
```

It prints the result in same format as above

**Params**

To prints all params

```
wmcli query bor params
```

**Expected Results:**

```text
sprint_duration: 64
span_duration: 6400
producer_count: 4

```

## REST APIs

| Name            | Method | Endpoint                      |
| :-------------- | :----- | :---------------------------- |
| Span details    | GET    | /bor/span/<span-id></span-id> |
| Get latest span | GET    | /bor/latest-span              |
| Get params      | GET    | /bor/params                   |
