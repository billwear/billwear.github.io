Interlayer addressing: ARP
==========================

One frequently asked question is this: Is ARP a layer 2 or layer 3
protocol? Actually, it's both, as you'll discover later, but it does all
of its work at L2. One way to distinguish L2 from L3 is to find out what
happens inside the firmware of the Network Interface Card (NIC), and
that's usually where ARP takes place. ARP maps MAC addresses, which is
how things are addressed in L2, into other addresses (e.g., IP
addresses), which is how L3 finds things. In theory, every NIC card in
the world has a unique identifier, called a *MAC address*. "MAC"
stands for "Media Access Control" -- you can find a little history of
this on Wikipedia, if you're interested.

When you're assigning MAC addresses with virtual machines, of course,
you may be re-using one that's actually assigned to a network device
out there somewhere. Inside your Layer 2 network, that isn't a
problem, because only devices connected to a physical switch -- that's
actually connected to the physical Internet -- care about unique MAC
addresses. Inside your network, the only conflicts you need to worry
about are the ones you create by hand-assigning MAC addresses. The
shorter answer to that implied question is this: MAC addresses must be
unique across the domain where they're used.

TCP/IP Does Not Use MAC Addresses
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If we look at the IP datagram again, we see that it doesn't know about
MAC addresses at all: TCP, UDP, and a number of other protocol stacks
are written to use IP addresses. Routers depend on IP addresses, as
we've already seen. This creates a bit of a conundrum: How do we map
between MAC and IP addresses, and what does the mapping? Is it a layer 2
or layer 3 operation? The first thing to remember is that the MAC
address is "ROM-burned" into the NIC card. IP addresses, on the other
hand, are assigned to a NIC by a DHCP server or an administrator. This
intentional separation of addressing schemes is what makes the Internet
flexible.

Fixed Versus Assigned Addressing
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Here's an analogy. Your postal address doesn't *actually* define where
your house is located. There are two layers of other addressing schemes
that are actually used by government organisations, like your county tax
assessor or the local air ambulance company. One is your land survey
location. Depending on where you live, this is defined by a series of
coordinates that go something like this: county, township, section,
plat, lot, etc. If you've ever looked at your property tax bill, it will
have your postal address on it, but it will not actually use your postal
address to define the taxable property.

Instead, it uses this unique set of (rather obscure) coordinates to
place you exactly on land survey maps. But that's not good enough for
the air ambulance, for two reasons.  First, the survey maps are huge,
complex, and hard to interpret, and they change somewhat as property
is bought or sold. Second, helicopter navigation is intentionally
independent of political boundaries.  Instead, the air ambulance will
use your latitude and longitude, which allows them to uniquely locate
you on the earth. Granted, the ambulance company has a tool somewhere
that automatically does the maths of translating your postal address
to lat/long coordinates, but the principle holds.

In terms of your local network, each of these "address levels"
applies. Your postal address corresponds to the IP address of a
machine. That IP address may or may not be unique, depending on the
domain. For example, you can use Google Maps to try and locate
something like "20 Main Street", and you'll get a really long list of
responses that vary by city. Likewise, there are probably hundreds of
thousands of local networks using addresses in the "192.168..."
subnet, since it's so common for local IP addressing. As mentioned
above, routers at the network layer take care of protecting these
unique local addresses when going out on the Internet. On the other
hand, your NIC's MAC address is like the GPS lat/long coordinates;
it's unique across the entire world.

What about the analogue of survey maps? Well, it's not hard to argue
that these are more like the MAC addresses that you assign to your
VMs.  Every county in a state like, say, Mississippi has the
coordinates Township 1, Section 1, Parcel 1 -- but the outer domain
(the county) makes those coordinates unique. Granted, we don't use a
different format for MAC addresses for VMs than we do for
Internet-connected NICs, but you get the idea.

Address Resolution
^^^^^^^^^^^^^^^^^^

Address resolution is what we call the process of mapping between IP
addresses and MAC addresses. It's done with something called ARP, which
stands for "Address Resolution Protocol". Oddly enough, ARP takes on a
life of its own, so you may hear it discussed in unusual ways. Some
people call it "the ARP", others speak of "arpd" (the ARP daemon),
although if you look at the man page for arpd, you'll see those
characterisations are not precisely correct.

A frequent question is, "Where does ARP take place?" Maybe the better
question is, "Where is ARP implemented?" As always with
Internet-related things, the answer can vary, but normally, ARP is
implemented as part of the embedded code in the NIC. Technically, this
means that ARP operates at Layer 2. More often, you'll see vendors
hedge their bets on this, with phrases such as "operates below the
Network Layer", as in this explanation.

In reality, in order to work correctly, ARP has to map IP and MAC
addresses. To better understand, let's walk an ARP call. It begins in
say, a Web browser, when the browser makes a call to parse the URL. In
most cases, that URL contains a hostname (not an IP address), so the
following sort of dance takes place: We won't go into this in much
detail now, just know that the browser is able to gather an IP
address, if it exists. To make the walk-through less confusing, let's
assume that we're looking for a host with IP 192.168.17.4.

Next, the browser requests a connection with 192.168.17.4, using the
TCP protocol, which sends a connection request, as an IP packet, to
192.168.17.4. Along the way, there is probably more than one router
hop. ARP sends a broadcast request to everything on the relevant
subnet. This request looks like the ARP message above, but it's
encoded as a MAC frame, which helps to answer the often-fuzzy
question, "Is ARP Layer 2 or Layer 3?" As you see, this is an L2
message.

Incidentally, ARP only works as a broadcast, by the way; that is, it
only works on a broadcast network. A very important note for some
systems like MAAS: ARP requests don't typically span VLANs.

Essentially, this ARP message contains the IP address 192.168.17.4,
but no corresponding MAC address in the message. This tells the owner
of 192.168.17.4 that it should reply with a similar ARP message,
including its MAC address. When the sender receives the ARP reply, it
can send the datagram directly to the destination host, embedded in an
Ethernet frame, using the MAC address. By the way, for efficiency, the
sending host and the intermediate routers are all doing ARP
caching. They copy down the mapping between IP and MAC addresses,
holding onto it for about twenty minutes. In terms of most network
transactions, twenty minutes is an eternity.

Messages are Sent to mac Addresses
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

We often speak of TCP/IP as if messages are sent from one IP address to
another, but that's actually not strictly true. Messages are sent to MAC
addresses. IP addresses are only used to get MAC addresses, so the
message can go through. We can return to the air ambulance company to
see a practical analogy. A 911 call comes in for "20 Main Street,
Yourtown, Yourstate, Yourpostalcode". The address is sent to the pilot
of the helicopter, who punches the address into his GPS. The GPS uses
the postal address to retrieve the lat/long coordinates, which are then
used to guide the helicopter, via satellite navigation.

The same sort of thing happens when you use the GPS navigator in your
car. The navigator is translating a logical (postal) address to a
physical (lat/long) address on the surface of the earth, calculating a
route, and translating that route back to logical landmarks (street
names) to let you know how to get there. By the way, You should also
note that ARP only works with IPv4. Certain other protocols, like
Point-to-Point Protocol (PPP), don't make use of ARP at all.

The ARP Frame
^^^^^^^^^^^^^

ARP sends requests as an Ethernet frame, using the MAC address. If you
remember the MAC frame from earlier: The ARP frame is just a special
case of the MAC frame, replacing everything the DSAP, SSAP, control
bits, and data with the ARP message shown above. The resulting ARP frame
looks something like this: Based on the above diagram, you can see how
the ARP request fits into the Ethernet frame to make an ARP frame.

The ARP cache
^^^^^^^^^^^^^

Let's take a look at the ARP cache on a local system, ``cloudburst``. We
can do that like this: You'll see that all three bridges are in a DOWN
state, and again, ``lxdbr0`` is so cold that it doesn't even show up in
the ARP table. Let's bring up a LXD VM connected to ``lxdbr0`` and look
at the ARP table again: Note that the ``lxdbr0`` bridge now shows up and
has a MAC address, too -- no incomplete entry here.

If we look at the MAC address of ``lxdbr0`` in the ``ip`` listing,
we'll see it matches up. Those "(incomplete)" entries are old. They've
been cached, but no traffic has passed through those bridges in a
really long time. The cache is just persistent in holding onto the IP
addresses, but not the MAC addresses (since they could be stale). 

More About ARP
^^^^^^^^^^^^^^

Another form of ARP is promiscuous ARP, in which some proxy host
pretends to be the destination host and provides an ARP response on
behalf of the actual destination host. You shouldn't use this form of
ARP unless there's no other choice. You can Google it (and use it at
your own risk), but it won't be described here.

There is also gratuitous ARP, when the source and destination IP
addresses are the same. This can be used for at least two
purposes:

 1. To find out if someone else already has the source machine's IPv4
    address, a technique called Address Conflict Detection by some
    references.
 2. To update the source machine's new MAC address (e.g., a new NIC
    card was installed) in upstream ARP cache entries. This is
    something akin to pre-caching MAC addresses before they're
    actually needed. You can read more about these (and many more)
    nuances of ARP, but this introduction should answer most of the
    immediate questions.


--------------

Copyright (C) 2024 by Bill Wear; All Rights Reserved
