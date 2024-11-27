The Physical Layer
==================

The phrase "physical layer" may conjure up notions of physics, but don't
worry: we look at *signals*, not *electrons*. At the physical layer,
we're looking for binary (on/off) signals, set to the cadence of a
clock. Every computer brings its own clock to the party, so we
definitely need a way to "synchronise our watches". NTP, the network
time protocol, does the trick. NTP is probably the oldest Internet
protocol in use. It synchronises subscriber computers to within a few
milliseconds of UTC (Coordinated Universal Time).

That acronym is *not* out of order, by the way. English speakers
wanted CUT (for "coordinated universal time"), while French speakers
preferred TUC (for "temps universel coordonné"). "UTC" was picked
because, (1) it was a compromise between those two proposals, and (2)
there was already a "UT" (Universal Time) that is based on a measure
of the Earth's current angle of rotation and the International
Celestial Reference Frame....

Yeah, it really *is* better if you don't ask. You could say that NTP
only has one job: keeping time. Like all the moving parts of a clock,
though, keeping computer clocks in sync is very difficult. If your
curiosity is stronger than your fear of complexity, you might `take a
look at this NTP article on Wikipedia
<https://en.wikipedia.org/wiki/Network_Time_Protocol>`_. It'll tell
you more than you need to know about the protocol.

Variable Latency
^^^^^^^^^^^^^^^^

Variable latency is the important thing to know about the physical
layer, because it affects the timing of network traffic. In order to
understand variable latency, we need to understand network latency.
Packets aren't sent without some delay, because of: - The processing
delay - how long it takes the router to process the packet header. - A
queuing delay - how long the packet sits idle in routing queues. -
Transmission delay - how long it takes layer 1 to push the packet's bits
onto the link. - Propagation delay - how long it takes the bits to
travel through the wire to the other end. The size of the queue directly
influences how fast data can get onto the link. The processing and
transmission delays are real, though relatively constant. The
propagation delay doesn't just depend on the speed of light, because
there may be lots of other "relay" computers in the link. Propagation
depends on network architecture, network congestion, and the number of
hops (how many routers between source and destination), among other
things.

As we'll see later on, within your enterprise, modern cloud
architectures usually create significantly less propagation delay.
Variable-latency networks are "variable" because of the density of
network traffic and the complexity of the route between hosts. We
can't predict congestion or routing, although we can influence local
routing by choosing the right network architecture. We can't predict
transmission delays, though we can statistically bound them. Almost
all digital networks are considered "variable-latency".

The Physical Layer is not Very Interesting
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In spite of the complexities given above, the physical layer really
doesn't do much for us when it comes to building and debugging networks.
Other than verifying that signals are flowing, the physical layer
doesn't usually tell us much about what happened to that DHCP request
that never made it to the router. Consequently, we really won't talk
that much about the physical layer. Just know that it's the thing that's
passing bits back and forth between hosts, and very occasionally, we
need to scan it to find network breakage.

--------------

Copyright (C) 2024 by Bill Wear; All Rights Reserved
