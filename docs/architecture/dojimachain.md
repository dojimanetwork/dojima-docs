# Dojima Chain Layer

The dojima chain layer is where assets, NFT’s and Defi dapps from all the connected chains meet. The Dojima chain layer is powered by Decentralised network of Proof-of-Stake (PoS) validators. Dojima Network relies on a set of validators to secure the network. The role of validators is to run a full node; produce blocks, validate, participate in consensus, run relayer and oracle services  and commit checkpoints.

### EVM Compatible VM

The Ethereum Virtual Machine (EVM) is a powerful, sandboxed virtual stack embedded within each full Dojima node, responsible for executing contract bytecode. Contracts are typically written in higher level languages, like Solidity, then compiled to EVM bytecode.

### DojimaChain Fee Model:

For normal transaction, fees in Dojima token gets collected and distributed to block producers, similar to Ethereum transactions.
Like other blockchains, Dojima has a native token called Dojima(DOJ). DOJ is an ERC20 token used primarily for paying gas(transaction fees) on Dojima and staking.
An important thing to note is that on the Dojiam chain, the Dojima tokens works as an ERC20 token, but also as the native token - both at the same time. Therefore, this means that a user can pay gas with DOJ as well as send DOJ to other accounts.
For genesis-contracts, gasPrice and gasLimit works same as Ethereum, but during the execution it won't deduct the fees from sender's account.
Genesis transactions from current validators are executed with gasPrice = 0.
Validators have to send following types of transaction like State proposals like deposits & Span proposals on Dojima Chain.

### Proposers and Producers Selection

Block Producers for the DojimaChain layer are a committee selected from the Validator pool on the basis of their stake, which happens at regular intervals and is shuffled periodically. These intervals are decided by the Validator's governance with regards to dynasty and network.
Ratio of Stake/Staking power specifies the probability to be selected as a member of the block producer committee.

### Selection Process

Let's suppose we have 3 validators in pool, and they are Alice, Bill and Clara.
Alice staked 100 DOJ  tokens whereas Bill and Clara staked 40 DOJ tokens.
Validators are given slots according to the stake, as Alice has 100 DOJ  tokens staked, she will get slots proportionally. Alice will get 5 slots in total. Similarly, Bill and Clara get 2 slots in total.
All the validators are given these slots [ A, A, A, A, A, B, B, C, C ]
Using historical block data as seed, we shuffle this array.
After shuffling the slots using the seed, say we get this array [ A, B, A, A, C, B, A, A, C]
Now depending on Producer count(maintained by validator's governance), we pop validators from the top. For e.g. if we want to select 5 producers we get the producer set as [ A, B, A, A, C]
Hence the producer set for the next span is defined as [ A: 3, B:1, C:1 ].
Using this validator set and tendermint's proposer selection algorithm we choose a producer for every sprint on DojimaChain.

### SystemCall Interface

System call is an internal operator address which is under EVM. This helps to maintain the state for Block Producers for every sprint. A System Call is triggered towards the end of a sprint and a request is made for the new list of Block Producers. Once the state is updated, changes are received after block generation on DojimaChain  to all the Validators.

### Functions

**proposeState**

Call is only allowed to validators.
Inspect stateId if it is already proposed or committed.
Propose the stateId and update the flag to true.

**commitState**

Call is only allowed to System.
Inspect stateId if it is already proposed or committed.
Notify StateReceiver Contract with new stateId.
Update the state flag to true, And remove the proposedState.

**proposeSpan**

Call is only allowed to validators.
Check if the Span proposal is pending.
Update the Span Proposal to true

**proposeCommit**

Call is only allowed to System.
Set initial validators if current span is zero.
Check Conditions for spanId and time_period of Sprint and Span.
Update the new span and time_period.
Set validators and blockProducers for the sprint.
Update the flag for spanProposal to true.