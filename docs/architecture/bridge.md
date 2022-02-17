---
sidebar_position: 4
---

# Bridge

Bridge Service is one of the important responsibilities of a validator.

All the Independent Validators run this service and is responsible for relaying the information between chains. The components in the Bridging layer are:

**Listener:**
Listener listens to all the chains and gathers events generated from different chains to interact with dojima network. Each Chain has its own listener implementation to gather different events.

**Queue:**
Queue is where all the events received from different chains is stored to execute them in serialized order.

**Processor:**
Processor is responsible for processing the events from different chains and transforms them into a format that the receiver chain of event understands.

**Broadcaster:**
Brodcaster brodcasts information to the receiver chain according to reciever ID of the event. Brodcaster also creates a message type the receivr chain understands.
