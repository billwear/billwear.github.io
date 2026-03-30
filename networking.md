---
layout: page
title: "Networking Tutorial"
permalink: /networking/
description: "A ground-up networking tutorial covering TCP/IP, the OSI model, Ethernet frames, ARP, routing, and TCP — written for people who want to actually understand what's happening on the wire."
---

I really want to write about networks. I'm happy that it pays my bills, but I'm going to write about them anyway, so it just makes sense to share.

I've noted that a lot of people have little blind spots in their network knowledge; I'm quite sure I do, too. This tutorial may just help both of us, in the quietest, most anonymous way possible.

I really believe that a good understanding of networking fundamentals makes it much easier to design, operate, and debug your own networks. Feel free to pick and choose sections as you need them.

---

## How we got here

Sometimes, bad things give us good results. TCP/IP — and a lot of its underlying structure — evolved to meet a specific need. TBH, that need is rather gruesome: how can we keep a computer network functioning in the event of a nuclear war? When nodes go offline, randomly, how can surviving nodes keep the communication going?

Over time, those same TCP/IP networks evolved to meet a less bellicose need: how can we keep a network functioning efficiently if some of the paths are bottlenecked? Well, you build the ARPAnet — now called the Internet — which relies heavily on TCP/IP networks. The OSI model underlying TCP/IP can adapt to changing loads, handle significant failures, and strictly limit the network "blast radius" (yes, sadly, that's what it's called) when things go wrong.

Happily, the threat of nuclear war has dropped off substantially in the meantime. Also happily, the TCP/IP network survived even the loss of its original purpose. This tutorial is about the surviving network, although, as an appropriately trained and experienced engineer, I could probably talk at equal length about nuclear war. Most happily, I won't.

---

## Focusing on architecture

With complicated subjects, it's always hard to know where to start. There's a huge chicken-and-egg problem with TCP/IP when trying to define terms. I prefer to take Isaac Newton's approach to physics, as he did in the Principia — create some definitions that start from common things we're all likely to understand.

For example, Newton begins with mass; slightly paraphrasing his definition:

> The quantity of matter is defined as the density of that matter and the volume that it takes up, conjointly.

In other words, m = ρ × V, or "mass equals density times volume." That doesn't seem like much, but it's an astounding starting point. Hint: if you haven't read an English translation of the Principia (it's natively in Latin), you should take the time to do so — it'll change your understanding. Anyway, back to our story.

### Network architecture

It's very easy to just dive in, and some fair percentage of readers will follow, but that isn't good enough for this tutorial. Instead, imagine two computers, "SanDiego" and "Bangor", located at opposite corners of the country. They want to communicate via available networks. How do they do it?

We could hook up a wire between SanDiego and Bangor. People probably did that, at one point. And it probably worked. But there are at least two drawbacks:

- It's a long wire, which has lots of impedance. Signals will likely disappear into noise long before they arrive. That means repeaters, which means real estate at specific intervals — cost-prohibitive for most situations.
- It's a single point of failure. If someone cuts the wire, there's no alternative. You could run multiple cables and trunk them separately, but cables get cut by people with backhoes.

The easiest solution is the Internet. As it became "the network," it evolved into what some call the "access-aggregation-core" network. In this model, SanDiego sends a message labelled for Bangor to some router. If that router doesn't know where Bangor is, it sends the message on to another router, until one knows how to forward it.

This works, but from a practical standpoint there are "short circuits" all over the network — sideways paths that exist for performance or financial reasons (latency, redundancy, better deals). Networks have evolved toward a more uniform design known as the Clos architecture: leaf switches (top-of-rack, or TOR) and spine switches, scaling horizontally by adding racks and vertically by adding spine levels. More economical to scale, and it discourages the "side bets" that plagued the early Internet.

### Yesterday's phone network is today's Internet

Most of today's modern networking is a direct translation of the landline telephone system — the "Plain Old Telephone Service (POTS)" — into the digital space. Network switching is really just an outgrowth of crossbar, which is how local phone calls were "switched" to the correct telephone line. In most cases, every number dialled closed one more relay, with all seven relays making a connection to the target phone line.

Small exchanges often "swallowed" dialled digits. For example, if every local phone number had the exchange "881", those numbers wouldn't trigger any relays beyond sending the call to the "881" frameset. In some small exchanges, it wasn't even necessary to dial the exchange. These were the early subnets.

Over time, denser coverage and self-service long-distance changed everything. More wires, more repeaters for longer distances, local exchanges replaced by centralised "central offices" (CO). A CO would serve 8 or 10 exchanges, functioning like today's network routers.

Repeaters had to be installed at regular intervals to overcome impedance. Those color-camouflaged "go-away-grey" metal cans (pedestals) popped up everywhere — partly for rerouting, partly to house repeaters. We still have those in today's networks, but we call them racks or patch panels.

T1 lines, as they were called, provided a speedy (at the time) 1.5Mbps connection. T1 wasn't designed for network traffic — the idea was to multiplex phone calls via Time-Division Multiplexing. TDM split call traffic into little digital packets sent on a rotating basis. The first T1 lines, appearing around 1962, could handle about 24 calls without the average user noticing. These "little digital packets" formed the model for the packet networking we have today.

T1 used ordinary double-twisted-pair copper wiring, with repeaters at roughly one-mile intervals. When WAN and MAN networking became a thing, the phone company repurposed some of those pairs to carry data. Many key elements of TCP/IP — twisted-pair Ethernet cables, packet-based messaging, multiplexing — are holdovers of the original telephone system, repurposed for computer networking.

### The Internet infrastructure

There's an idea floating around that the Internet is survivable because any computer can connect to any other computer. While theoretically possible, that's not generally how it works. There's actually a hierarchy:

> **Internet Infrastructure** — a hierarchy of computers used to transfer messages from one computer to another.

High-level networks (Network Service Providers, NSPs) connect to at least three top-level nodes called Network Access Points (NAPs), also known as Internet Exchange Points. At these points, packets jump from one NSP to another. NAPs are public access points; Metropolitan Area Exchanges (MAEs) are private. These are virtually indistinguishable for the purposes of this discussion — and many MAEs are the residue of the phone company's early T1 backbone.

### About Internet network traffic

On-the-fly, Internet network paths can become very complicated and somewhat unpredictable. There's rarely a reason to count hops or trace routes, unless you're debugging a broken route with `traceroute`. From a TCP/IP point of view, it's much easier to ignore the specific network, since the path can theoretically change every time a message is sent, even between the same two computers.

When designing and troubleshooting networks, knowing the specific route almost never helps. What we want to understand is the traffic between computers — what kind of data travels besides just the payload. Internet data flows are governed by the OSI model.

---

## The OSI model

Not the WWII forerunner of the CIA — the *Open Systems Interconnect* model. Networks are really just continuous wires. What travels on those wires depends on your perspective, your level of magnification. At the highest zoom level, all you see are electrons; that's too abstract to be useful for debugging. The OSI model standardises a few useful levels.

The OSI model starts just above the raw physics, with the physical layer (Layer 1). Layers are added on top of each other — the first layer you put on isn't "layer 6," same as the first coat of varnish on furniture.

### The physical layer (L1)

At the physical layer, we're looking for binary (on/off) signals set to the cadence of a clock. Every device brings its own oscillator, so there are actually two distinct synchronisation problems to solve. The first is wall-clock time — knowing that it's 14:32:07 UTC — which NTP (Network Time Protocol) handles across the network. The second is bit-level clock recovery — knowing exactly when each transmitted bit starts and ends so the receiving NIC can decode the signal correctly. NTP doesn't help with that; it's handled by the preamble in each Ethernet frame, which we'll get to shortly.

**Variable latency** is the most important thing to know about the physical layer. Packets aren't sent without delay:

- **Processing delay** — how long it takes the router to process the packet header
- **Queuing delay** — how long the packet sits idle in routing queues
- **Transmission delay** — how long Layer 1 takes to push the packet's bits onto the link
- **Propagation delay** — how long the bits take to travel through the wire

Variable-latency networks are "variable" because of traffic density and route complexity. We can't predict congestion or routing, though we can influence local routing by choosing the right architecture. Almost all digital networks are considered "variable-latency."

Other than verifying signals are flowing, the physical layer doesn't usually tell us much. Just know that it passes bits back and forth between hosts, and very occasionally we need to scan it to debug network issues.

### The datalink layer (L2)

The datalink layer (L2) has one purpose: send and receive IP datagrams. L2 is intentionally "connectionless" — it doesn't maintain a connection with the target host, doesn't guarantee delivery or integrity of packets. It just ships them between source and destination.

A **datagram** is just a basic network transfer unit — the indivisible unit for a given layer. At L2, it's an IEEE 802.xx frame. At the network layer, it's a packet. For the transport layer, it's a segment. We'll call these indivisible layer units **PDUs** (protocol data units) to avoid conflation with other uses. At the link layer (L2), the PDU is a frame.

#### MAC frames

A MAC frame encapsulates packets from the network layer so they can be transmitted on the physical layer. Frames range from 5 bytes up to the kilobyte range. The upper size limit is called the maximum transmission unit (MTU). Internet networks almost exclusively use Ethernet (IEEE 802 standards), so we'll stick to that frame type.

#### Ethernet

Before explaining an Ethernet frame, a little background on how Ethernet controls the conversation — so computers don't "talk over each other."

Ethernet implements CSMA/CD: **Carrier Sense Multiple Access with Collision Detection.**

- **Carrier sense** — every NIC waits for the network to be quiet before transmitting
- **Collision detection** — if two NICs start simultaneously, both receive a jam signal and wait a randomly-generated amount of time before retrying. Each subsequent collision doubles the wait time. After a maximum number of retries, the NIC declares failure.

A note on CSMA/CD and modern networks: this collision-detection mechanism was essential for classic shared-medium Ethernet, where multiple devices contended for the same wire. Modern switched Ethernet operates differently — each device gets a dedicated full-duplex link to a switch port, so there's no shared medium and no collision domain. CSMA/CD is effectively inactive on modern switched infrastructure. The framing and addressing described below still apply; the collision-avoidance dance mostly doesn't. It's worth understanding CSMA/CD anyway, because you'll encounter it in documentation, older hardware, and any network that still uses hubs rather than switches.

#### Media Access Control (MAC)

MAC is one half of the link layer (Logical Link Control, or LLC, is the other). If you've worked with networks at all, you've heard of MAC addresses — unique serial numbers assigned to network interface devices at manufacture. Theoretically unique worldwide (VM environments complicate this, but within a subnet, conflicts are manageable).

The MAC sub-layer connects to the physical layer via a media-independent interface (MII), independent of the actual link protocol (cellular, Wi-Fi, Bluetooth, Cat5e, T1, etc.). It grabs higher-level frames, encodes them into MII format, adds synchronisation info, pads the message if needed, and adds a frame check sequence for error identification.

An Ethernet MAC frame contains:

- **Preamble** (7 bytes) — clock sync, alternating zeroes and ones, gives the receiving NIC time to recover the clock
- **Start Frame Delimiter (SFD)** — exactly `10101011`, where the final "11" signals that real header content starts next
- **Destination Address (DAddr)** — 6 bytes, the MAC address of the next hop (which may be an intermediate router, NAP, or MAE — not necessarily the final destination)
- **Source Address (SAddr)** — 6-byte MAC address of the sender; doesn't change as long as the message traverses only L2 switches
- **PDU Length** — byte length of the entire frame if ≤1500; if longer, indicates a message type (IPv4, ARP, or VLAN-tagged)
- **DSAP, SSAP, Control** — one byte each, define devices and protocols; grow more complex with newer 802 standards
- **Data / Payload** — the actual packet from the layer above; minimum 46 bytes (padded if smaller), maximum 1500 bytes in conventional Ethernet
- **CRC / Frame Checksum (FCS)** — standard checksum to verify message integrity

#### Trunking VLANs

A crucial modification to the basic frame format is the **P/Q or VLAN Tag**, which enables VLAN trunking — sending all VLAN data over the same wire and port, using a tag field to control access.

The P/Q tag fields:
- 16 bits of tags / protocol ID
- 3 bits representing priority
- 1 bit Canonical Format Indicator (CFI) — 0 for Ethernet format, 1 for Token Ring
- 12 bits of VLAN ID

When more than one VLAN spans multiple switches, frames need to carry VLAN information so switches can sort the traffic.

**The origin of "trunking":** derived from telephone network trunk lines — lines connecting switchboards. Each telephone had a subscriber line running straight from the local Central Office (CO). Connections between COs used trunk lines. When you draw out this network, the bundles of cables between COs look like the trunks of trees. The expression stuck.

With VLAN trunking, we're not just multiplexing packets — we're multiplexing LAN channels. The Ethernet VLAN tags make VLAN-bound messages less dependent on switch port configurations, which are particularly easy to misconfigure.

#### VLANs, subnets, and fabrics

When working with networks, you'll frequently encounter these three grouping concepts:

- **Subnets** define a range of IP addresses
- **VLANs** group subnets
- **Fabrics** group VLANs

**Subnets** are defined in CIDR (Classless Inter-Domain Routing) notation. `192.168.13.0/24` covers `192.168.13.0` through `192.168.13.255` — the "24" is the number of bits in the subnet address, leaving 8 bits (256 values) free for host addresses. CIDR replaced the old A/B/C class system, which was too rigid for modern network architects.

**VLANs** used to mean a series of IP addresses that could access a given port on a specific switch. With VLAN trunking, they're marked with 802.1Q bits in the MAC frame. Keep a clean correspondence: every IP in exactly one subnet, every subnet in exactly one VLAN. Overlapping subnets or subnets split across VLANs are possible but create debugging nightmares.

**Fabrics** collect VLANs (and thus subnets) into higher-level groupings. Example: separate VLANs for HR and payroll keep data siloed, while an "executive" fabric groups all VLANs together so executives get access without being explicitly added to each one.

### Interlayer addressing: ARP

ARP operates at L2 but maps to L3 — hence the FAQ "Is ARP Layer 2 or Layer 3?" It's both, but all of its work happens at L2. ARP maps MAC addresses (how L2 addresses things) into IP addresses (how L3 finds things).

**TCP/IP does not use MAC addresses.** TCP, UDP, and other protocol stacks are written to use IP addresses. Routers depend on IP addresses. But messages are actually *sent* to MAC addresses — IP addresses are used only to *get* MAC addresses. This is the conundrum ARP solves.

An analogy: your postal address doesn't actually define where your house is located. There are two other addressing schemes in use — the land survey location (county, township, section, plat, lot) and GPS coordinates (latitude/longitude). The postal address maps to the GPS coordinates for navigation, just as an IP address maps to a MAC address for packet delivery.

**Address resolution** is the process of mapping between IP and MAC addresses. ARP sends a broadcast request to everything on the relevant subnet: "Who has IP 192.168.17.4?" The owner of that address replies with its MAC address. The sender can then embed the datagram in an Ethernet frame addressed to that MAC. Intermediate routers cache these mappings (ARP caching) for about twenty minutes.

**Important note:** ARP requests don't typically span VLANs.

A quick look at the ARP cache on a local system:

```bash
stormrider@cloudburst:~$ arp
Address                  HWtype  HWaddress           Flags Mask  Iface
192.168.1.24             ether   0c:8b:7d:f1:51:d3   C           wlo1
10.250.204.17                    (incomplete)                     mpqemubr0
192.168.1.24             ether   0c:8b:7d:f1:51:d3   C           enx606d3c645a57
192.168.117.16                   (incomplete)                     virbr0
```

Column meanings:
- **Address** — the cached IP address
- **HWtype** — hardware type; blank when there's no MAC address
- **HWaddress** — the device's MAC address; "incomplete" means an ARP request was sent but no response received
- **Flags Mask** — `C` = learned automatically from ARP responses; `M` = manually entered; `P` = Publish (how to respond to incoming ARP packets)
- **Iface** — interface name

The `(incomplete)` entries are old — VMs that haven't been used in a while. The cache holds onto IP addresses but drops stale MAC addresses. Clear and rebuild:

```bash
sudo ip -s neigh flush all
```

Other ARP variants worth knowing about:
- **Promiscuous ARP** — a proxy host pretends to be the destination and provides ARP responses on its behalf; use only as a last resort
- **Gratuitous ARP** — source and destination IP are the same; used for Address Conflict Detection or to update upstream ARP cache entries after a NIC change

### The network layer (L3)

You might have noticed that "IP" is part of Layer 3 while TCP and UDP are Layer 4. It's a little confusing that we say "TCP/IP" when "IP" applies to many other protocols (UDP, ICMP, etc.). For the purposes of these networks, we're talking almost exclusively about TCP/IP.

The network layer does not guarantee delivery. It makes every effort to deliver IP datagrams (packets) to the destination, but its error handling is simple: toss the packet into the bit bucket. It's also connectionless — packets making up a message aren't part of an ongoing conversation. They can be split, encoded, sent separately via different routes, and arrive completely out of order. Packets can be duplicated or corrupted. Sorting all that out is Layer 4's job.

**Network byte order:** the network sends bytes in big endian order — bit 0 first, down to bit 31, typically eight bits at a time. Many Internet computers use little endian encoding, so byte order has to be reversed somewhere between RAM and Layer 3. Rarely relevant, but occasionally surfaces as a fault.

#### Packets

Packets are basic IP message units. A message gets split into multiple packets by L4 so it can be efficiently sent.

Analogy: imagine sending a very long letter to a friend, but you only have envelopes and first-class stamps — and your scale only goes to three ounces. You'd sit down, carefully number the pages, divide them into one-ounce piles, put each pile in a stamped envelope, and mail them separately. Your friend reassembles the message by page number, regardless of delivery order.

Networks chose a fixed (relatively short) packet length for statistical efficiency: everyone's messages are delivered at a fairly constant, reliable rate. A larger message takes longer to send — but the network doesn't favor whoever throws the biggest packet first. This is **multiplexing**.

#### IP packets

The IPv4 header attaches to the front of data packets up to about 65K long. Key fields:

- **IP Protocol Version** — 4 for IPv4, 6 for IPv6
- **Internet Header Length** — number of 32-bit words in the header; usually 5
- **Differentiated Services Code Point** — specifies service classes; normally "best-effort"
- **ECN (Explicit Congestion Notification)** — set by a congested router to alert the sender to slow down
- **Total Length** — entire packet length including data
- **Identification** — serial number from the sending NIC, helps uniquely identify the datagram; works like a take-a-number ticket
- **Flags** — indicates packet is a fragment of a longer message
- **Fragmentation Offset** — used with Identification to reassemble message order
- **Time to Live (TTL)** — number of routers a datagram can pass through before being discarded; limits the number of times a packet's destination IP can be changed. The field maxes out at 255. Most operating systems default to 64 as the initial TTL value — Linux and macOS use 64, Windows uses 128. You'll see these numbers when running `ping` or `traceroute`. The "time to live" name is historical; it was originally conceived as seconds, but in practice each router hop decrements it by 1 regardless of actual time elapsed.
- **Protocol** — indicates the higher-level protocol (TCP, UDP, etc.)
- **Header Checksum** — integrity check for the header only (IPv4 only)
- **Source Address** — IP address of the sender for this hop
- **Destination Address** — IP address of the destination for this hop

#### Routing

Routing takes place at the network layer by changing source and destination addresses without losing track of the replaced address. The router assigns a unique port number to the outbound message and records the source IP against that port. When the reply comes back on that port, it looks up the original NIC's IP address and routes the answer back.

---

## The transport layer (L4)

Layer 4 is handled only by end hosts — not routers or other switching gear. This layer handles redundancy, confirmed delivery, managing packets on an unreliable network. It's the last layer that TCP/IP has anything to say about; layers above are unique to specific applications.

If IP is connectionless, the transport layer is all about connections. L4 is the last place in the stack where the entire message exists in one piece. It breaks larger messages into segments, attaches a TCP header to each, and passes them to L3 as IP packets.

### TCP: Transmission Control Protocol

UDP — another L4 protocol — has no mechanism for reliable delivery. As the t-shirt says: "I'd tell you a joke about UDP, but you might not get it." UDP is *fire and forget*.

Making sure a message got delivered is as old as time. The solution is **ARQ: Automatic Repeat reQuest** — keep sending the message until you know it got there, intact. Two mechanisms make this work:

- **ACK** — acknowledgment that the message arrived
- **CRC** — Cyclic Redundancy Check to verify integrity

If the message arrives and passes the CRC, an ACK is sent. If the messenger never returns? We deal with that by waiting a set amount of time for an ACK before resending. The recipient needs to handle duplicate messages.

Key implications:
1. Messages may arrive out of order, so ACKs must be tagged with the ID of the message received
2. The recipient must reassemble messages in the correct order
3. There has to be a limit on unacknowledged messages — the **sliding window**. If the window is three messages and number four hasn't been acknowledged, number eight won't be sent yet. Like jelly beans in a jar with a small opening: only a few can pop through at once, and one has to fall out before the next one reaches the edge.

### The TCP header

The TCP header contains:

- **Source port** — the application port number of the sending host (e.g., 21 for FTP)
- **Destination port** — the application port number requested on the destination host
- **Sequence number** — sequence of this segment, used for reassembly and detecting dropped packets
- **Acknowledgement number** — the next sequence number the destination expects; gates packets through the connection
- **TCP header length** — indicates where the data begins
- **Reserved** — currently always 0
- **Code bits** — a set of flags (see below)
- **Window** — negotiates how many bytes the destination is willing to receive at once; the sliding window
- **Checksum (CRC)** — integrity check for the segment
- **Urgent pointer** — data byte count where urgent data ends; used if URG flag is set

Code bit flags:
- **URG** — urgent pointer is meaningful; prioritise this message
- **ACK** — acknowledges successful delivery of the previous segment
- **PSH** — push notification; data is complete, push to the application
- **RST** — request a connection reset; abnormal termination
- **SYN** — three-way handshake; syncs sender and receiver (similar to the MAC frame preamble, but at a higher level)
- **FIN** — we're done, close the connection; normal termination
- **NS/CWR/ECE** — Explicit Congestion Notification

### TCP is like a phone call

TCP is all about the state of a connection — basically the same as a phone call. You exchange information when you pick up. You say "bye" when it's over. If there's a bad connection, one of you can reset by saying "let me call you back." TCP provides connection, flow control, multiplexing, and reliability — the telephone analogy holds surprisingly well.

There's much more to know about TCP — variable windows, flow and congestion control, connection management, encapsulation. You should now have enough basic knowledge to continue with the [excellent Wikipedia article on TCP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol). Fair warning: the rabbit hole is very deep.

---

## The session layer (L5)

The session layer is where ongoing interactions between applications happen. Data is framed in terms the application understands (e.g., cookies for a web browser). This is also where check-pointing (saving work finished so far) happens. Technologies at this layer include RPC, SQL, and NetBIOS.

---

## The presentation layer (L6)

The presentation layer converts data between formats and ensures standard encodings are used. This layer is all about file formats: ASCII, EBCDIC, JPEG, GIF, HTML.

---

## The application layer (L7)

The top layer is entirely the province of the application(s) processing messages. Two engineers talking about this layer are swapping stories about application protocols: FTP, DNS, SMTP, NFS. Almost nothing that happens at this layer — except for throughput estimates or misbehaving daemon code — filters into designing or debugging networks.