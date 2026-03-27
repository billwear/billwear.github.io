
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
DHCP Server Conflict Detection

    Share on: Facebook Twitter LinkedIn 

Newsletter signup

Get the latest Canonical news and updates in your inbox.
Work email:
*I agree to receive information about Canonical's products and services.

By submitting this form, I confirm that I have read and agree to Canonical's Privacy Policy.

This blog title should really be, “Why you always, always, always want conflict detection turned on on all the networks MAAS touches,” but that’s really long as a title. But hear me out.

As promised, here is another DHCP blog, this time explaining how you can have multiple DHCP servers on the same subnet, serving overlapping IP addresses. There are a lot of network-savvy folks who will tell you that serving the same set of IP addresses from two different DHCP servers just won’t work. While that’s a really good rule to follow, it isn’t totally accurate under all conditions.
Keeping it “loosely coupled”

Some DHCP implementations offer a feature called server conflict detection. In short, DHCP SCD uses ICMP Echo messages (pings) — with an appropriate wait time — to see if an IP address is in use before trying to lease it to a client. If all the DHCP servers on a given subnet have SCD enabled, you don’t have to worry about whether the DHCP server scopes overlap. You can assign whatever set of IP addresses you want to whichever DHCP server, and they will work together without addressing errors.

So what’s really surprising about this feature? Well, in RFC 2131, ping checks are recommended on both ends, by the DHCP server and the client:

    As a consistency check, the allocating server SHOULD probe the reused address before allocating the address, e.g., with an ICMP echo request, and the client SHOULD probe the newly received address, e.g., with ARP.

The capital letters there came from the spec itself. Essentially, DHCP servers really should check to make sure the addresses they send out aren’t already in use — and clients that get them should make sure they’re actually free before they use them.

From an architectural perspective, it might make more sense for DHCP servers to be enabled to talk to each other and coordinate assignment of IP addresses. It is possible to build and configure such DHCP servers — but that type of coordination isn’t really in keeping with the fundamental operation of DHCP.

As a protocol, DHCP is designed to be loosely coupled. Specifically, any client that has the DHCP protocol stack can discover any DHCP server or servers; any server can make an offer; and a client can take whichever offer it wants (though it’s typically coded to take the first DHCP offer that it can accept). Keeping that loosely-coupled architecture intact means letting DHCP servers check to see if the address they’re sending is in use before offering it, and letting clients check to see if an IP address is in use before they request to accept the offer.
The value for MAAS

There’s no exact count, but it’s fair to say that a very large number of MAAS installation and configuration issues resolve around competing DHCP servers, that is, multiple DHCP servers on the same subnet, using the same scope (or overlapping scopes), colliding with each other and preventing machines from getting IP addresses. This collision usually shows up as an ability to power on a machine, but not to commission it, since it can’t manage to complete the process of getting an IP address via DHCP.

MAAS already has some conflict detection built in, as documented in Managing DHCP:

    In some cases, MAAS manages a subnet that is not empty, which could result in MAAS assigning a duplicate IP address. MAAS is capable of detecting IPs in use on a subnet. Be aware that there are two caveats

    1. If a previously-assigned NIC is in a quiescent state or turned off, MAAS may not detect it before duplicating an IP address.
    2. At least one rack controller must have access to the IP-assigned machine in order for this feature to work.

    MAAS also recognises when the subnet ARP cache is full, so that it can re-check the oldest IPs added to the cache to search for free IP addresses.

If you want your configuration to run more smoothly, it’s useful to enable SCD on every DHCP provider on your network. It doesn’t hurt anything, and it really doesn’t cost that much (beside a little extra delay when assigning addresses). There are plenty of network issues associated with a large, bare-metal network. There’s no reason why DHCP conflicts need to be one of those issues.
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
