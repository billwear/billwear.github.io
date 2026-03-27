
Skip to main content
Canonical
Canonical

    Products
    Solutions
    Partners
    Careers
    Company

    Blog Article 

Bill Wear
on 8 July 2021
DHCP scope

    Share on: Facebook Twitter LinkedIn 

Newsletter signup

Get the latest Canonical news and updates in your inbox.
Work email:
*I agree to receive information about Canonical's products and services.

By submitting this form, I confirm that I have read and agree to Canonical's Privacy Policy.

It’s possible to have more than one DHCP server on the same network and still have everything work right, with no conflicts and no dropped packets or IP requests. It’s really not that hard to pull together, either, but there are some things to know, and some things to consider before we investigate that situation. For this blog, we’ll put some of the overlooked facets of DHCP in bold text. Let’s take a look.
A deep look at DHCP

DHCP is, technically, a network management protocol. In other words, it’s part of a collection of hardware and software tools that help to manage network traffic. DHCP is designed to automatically assign IP addresses and other communication parameters, such as default gateway, domain name, name server IPs, or time server IPs to clients. There are (at least) two participants in a DHCP transaction: a server and a client, but the client has to meet some requirements to participate. Specifically, the client has to implement an instance of the DHCP protocol stack; without that, it has no idea how to formulate Discovery and Request packets, nor can it recognise Offers or Acknowledgements (or NAKs, for that matter).

For what it’s worth, the “DHCP protocol stack” just means that a device can handle at least the following standard message types:

    DHCPDiscover: a broadcast message sent in the hopes of finding a DHCP server.  Note that clients that don’t get a DHCP response may be able to assign themselves an Automatic Private IPv4 address (APIPA), which should always be in the range 169.254.0.0/16. This is good to know, because you want to pretty much always leave that scope (that range of IP addresses) unused by anything else in your system.
    DHCPOffer: also a broadcast message, one that offers an IPv4 address lease; the lease is more than just an IP address, as we saw in the last DHCP blog.
    DHCPRequest: If you haven’t noticed by now, DHCP exchanges are little like rolling snowballs: they pick up more protocol information as they go and keep it for the duration of the transaction, sending it back and forth. In this case, the client sends back everything the DHCP server sent, along with a request to actually take the offered lease.
    DHCPAcknowlegement: If everything matches up when the DHCP server gets the Request, it responds with an Acknowledgement, which basically says, “Okay, you can lease this IP address for a set period of time.”
    DHCPNak: If the client waits too long to Request an Offer (generally, if a different server has already claimed the offered IP address), the DHCP server may respond with a Nak. This requires the client to start over again at Discover.
    DHCPDecline: If the client determines that, for some reason, the Offer has a configuration that won’t work for it, it can Decline the offer — that this also means it has to start again at Discover.
    DHCPRelease: When a client is done with an IP address, it can send a Release message to cancel the rest of the lease and return the IP address to the server’s available pool.
    DHCPInform: This is a relatively new message, which allows a client that already has an IP address to easily get other configuration parameters (related to that IP address) from a DHCP server.

As you may recall from the previous blog, the normal DHCP sequence is often referred to as DORA for “Discover, Offer, Request, Acknowledge,” which is what happens when everything goes right the first time. Note that, shortly before a lease expires, most DHCP clients will renew the lease, often with a shortened form of the exchange (Request/Acknowledge) which does not require a full DORA exchange. Also, this renewal exchange takes place directly between the client and the DHCP server, rather than being broadcast across the entire network.
Address allocation

There are (at least) three ways that a DHCP server can assign addresses to requesting clients:

    Manual or static allocation essentially means that the client receives a specifically-chosen IP address, or, at a minimum, keeps the first one that it’s assigned until the client decides to release it.
    Dynamic allocation means that a DHCP server assigns IP addresses from an available pool (scope) of addresses, which can change to another available address in that scope at any time, depending on the network dynamics.
    Automatic allocation is sort of a cross between the other two types. The DHCP server assigns an address from its defined scope, but then remembers which client got what address, and re-assigns that address to the same client when a new request is made.

Regardless of the allocation method, the DHCP server’s scope — its range of IP addresses that it controls (and can assign) — is something that must be user-configured.
A UDP exchange

DHCP is “connectionless,” meaning that basically everything takes place via UDP, usually by broadcast packets — that is, packets not overtly addressed to a specific device. As we saw in the last blog, the messages become targeted pretty quickly, using the payload to specify the IP address of the DHCP server and the MAC address of the requesting client, to avoid requiring every other device on the network to completely decode every DHCP message. Note that it is possible to target a UDP packet at a specific server, by choosing a unicast message type.
Scope, allocation, topology, and authority

A DHCP client can request its previous IP address, if it had one, but whether it gets that address or not depends on four things: scope, allocation, topology, and authority. Specifically:

    The larger the DHCP server’s scope of addresses, the more likely it is that the requested address will be available again.
    The chances of getting the same IP address again also depend on how the server is allocating addresses (see above). Static allocation guarantees the same address; automatic allocation makes it very likely; with dynamic allocation, it’s impossible to predict.
    Topology also plays into this process: if the DHCP server is using one or more DHCP relays to get some or all of its addresses, the chances of re-using the same IP address go down.
    Authority also affects the probability. An authoritative DHCP server will definitely answer any unanswered DHCPDiscover message, but that server is pulling only from its own scope.

So now that we have a few of these odds and ends down pat, let’s consider the situation when multiple DHCP servers operate on one network.
Multiple DHCP servers

With regard to multiple DHCP servers on the same network, there are three possible scopes to consider:

    Overlapping scopes: In this situation, more than one server can offer the same IP address. There is a way to make this work, by setting up the DHCP servers to talk to one another, but for most applications, this configuration can be avoided. We’ll discuss DHCP servers with overlapping scopes in the next DHCP blog.
    Adjacent scopes: In this configuration, IP addresses are assigned from portions of the same subnet. For example, one server might control scope 192.168.14.2 – 192.168.14.187, and another server might manage scope 192.168.14.200 – 192.168.14.247. This is the most common (and most reliable) setup for multiple DHCP servers.
    Heterogeneous scopes: This arrangement basically has DHCP servers on different subnets, such as 192.168.14.2 – .253 for one server, and 10.17.22.3 – .98 for the other. This can be made to work, but it’s extremely difficult to set up and not so easy to manage. We’ll also cover this outlier in the next blog.

So essentially, we’ve narrowed down our focus to the most obvious and reliable use case, adjacent DHCP scopes. But how do the two servers work together to manage DHCP requests?
Remember, connectionless

Well, the answer is, “they don’t.” The servers and clients operate independently on a first-come, first-served basis. A client makes a DHCPRequest. One or both of the servers may answer, depending on load and spare IP addresses. It’s also possible that neither will answer, because they’re both out of IP addresses, but with good network planning — and making one of those servers authoritative — those situations will be kept to a minimum or eliminated entirely.

If no servers answer, we may be looking at the APIPA situation, if that’s possible in the network. If one server answers, it’s a standard DORA exchange, as if there were only one server. If two servers answer, it’s the question of which Offer the client gets first. Remember that the Offer messages contain the DHCP server’s address in the payload.
Clarity is sometimes power

Hopefully, the foregoing discussion helped to clear up some potentially confusing things about DHCP in a more complex network environment. We’ll tackle the more difficult cases in the next DHCP blog, and then we’ll move on to some detailed examples.

Related posts

David Beamonte
11 March 2026
The bare metal problem in AI Factories

As AI platforms grow into large-scale “AI Factories,” the real bottleneck shifts from model design to operational complexity. With expensive GPU accelerators, hardware failures and inconsistent configurations lead directly to lost throughput and reduced return on investment. While Kubernetes orchestrates workloads, it cannot fix broken ph ...

Isobel Kate Maxwell
10 February 2026
Building new revenue streams: 3 strategic cloud opportunities for telcos in 2026

PWC claimed the ‘fundamental challenge’ behind slowing growth is that telecom’s ‘core products and services’ are ‘becoming commodities.’ The way forward lies in modernizing and diversifying: evolving from traditional telecommunications to ‘techco’ (technology company) services. In 2026, many of these opportunities will come from cloud com ...

Javier de la Puente
13 January 2026
Deploy your Spring Boot application to production

In this article we walk through the steps required to deploy a Spring Boot application to production using Juju and Kubernetes. The goal is to showcase the integration of the application with essential services like PostgreSQL for database management and Traefik for ingress control. ...

    Contact information
    Legal information
    Improve this site
    Projects
    Manage your tracker settings

© 2026 Canonical Ltd.

Ubuntu and Canonical are registered trademarks.
All other trademarks are the property of their respective owners.

For further information on data collection,
please refer to our privacy policy.
