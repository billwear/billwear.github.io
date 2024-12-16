Reinventing the Internet
========================

Especially in the computer field, people who come up with new ideas love
to pretend that they invented it. But as Newton said (him again?), we
are "standing on the shoulders of giants". In fact, it actually helps if
you realise that today's networking technology evolved from telephone
technology, which evolved from carbon fibres and cups of acid, which
evolved from telegraph clickers, which evolved from cans and strings....
If you look back far enough, everything about modern networks makes
perfect sense, because you can see the original problems that drove
today's designs.

For example, telephone connections have used balanced or twisted pair
wiring for more than 100 years. Twisted pairs resist interference from
other pairs of wires *because* they are twisted together. I have
*read* that in the very early days, the called party transmitted on
one wire, and the calling party transmitted on the other, but I've
never been able to make much mathematical sense of that, so take that
with a small box of salt. T1 lines just used ordinary,
*double*-twisted-pair copper wiring. When WAN and MAN networking
became a thing, the phone company just repurposed some of those pairs
to carry data traffic. Many other key elements of TCP/IP, like
twisted-pair Ethernet cables, packet-based messaging, and multiplexing
(like TDM), are all just holdovers of the original telephone system,
repurposed for computer networking.

Why invent something when you have a working model?  Just rename it.

To Be Fair...
^^^^^^^^^^^^^

Actually, in many cases, renaming isn't actually a *terrible* idea,
because it often conveys the repurposing aspect of the new technology.
You can buy t-shirts that say, "It's not really a cloud, it's just
someone else's server," but it's actually *useful* to say "cloud".
That implies that it's out there somewhere (you don't care where), it
may change randomly (as with the weather, you still don't care), and you
don't have to do anything about it.

Using the word "cloud" also kind of forces the providers to guarantee
the promise that you won't ever have to know anything about it except
an address where you can get to it, and maybe a handy script to upload
changes every time you save. The new name carries implications that
can't be drawn so easily from the term "someone else's server", and
that helps to set expectations and standards.

The Internet Infrastructure
~~~~~~~~~~~~~~~~~~~~~~~~~~~

There's an idea floating around that the Internet is survivable because
any and every computer can connect any and every other computer. While
that might be possible, that's not generally how it works. There's
actually a hierarchy which we refer to as the Internet Infrastructure: -
Internet Infrastructure -- a hierarchy of computers used to transfer
messages from one computer to another.

Yes, the Internet is *theoretically* survivable because every
computer can connect to every other computer, but that's not standard
operating procedure. High-level networks (Network Service Providers,
NSPs) connect to at least three top level nodes called Network Access
Points (NAPs), aka Internet Exchange Points. At these points, packets
to jump from one NSP to another. NAPs are public access points,
Metropolitan Area Exchanges are private. These are virtually
indistinguishable for the purposes of this discussion.

And, of course, by now you've probably guessed that many of the MAEs
are the residue of the phone company's early T1 nodes, which was the
initial backbone for the Internet. These MAEs act just like a NAP for
the purposes of this discussion.

About Internet Network Traffic
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

On-the-fly, Internet network paths can become very complicated and
somewhat unpredictable. As a result, there's rarely a reason to even
count how many hops a message takes, or where it hops, unless you're
trying to debug a broken route with, say, \`traceroute\`. From a TCP/IP
point of view, it's much easier to ignore the specific network, since
each one is custom built, so to speak. The path can theoretically change
every time a message is sent, even between the same two computers.

When it comes to designing and troubleshooting networks, knowing the
specific route (almost) never helps. What we do want to know about is
the network traffic between computers. We have to understand what kind
of data travels between computers, besides just the data we send. The
structure and grouping of message traffic in TCP/IP is governed by the
**OSI model**. Let's take a look.

The OSI Model
-------------

No, that's not referring to the WWII forerunner of the CIA (which was
the OSS), but to the Open Systems Interconnect* model, once called GOSIP.
Networks are really just continuous wires. We need to understand what
travels on those wires, which depends on our perspective -- our level of
magnification. At the highest "zoom" level, all we'll see are electrons
travelling down the wire; that's a level of abstraction that isn't
comprehensible for debugging purposes. About all we can tell is whether
or not the circuit's dead -- and not even that, if we don't pick a low
range on the voltmeter.

The Open Systems Interconnection model was created to standardise on a
few, well-defined levels. It defines how the data should be
*encapsulated*, how the transmission "dance" is carried out, and
what to do when things go wrong. Collectively, this *interface
definition* is called a *protocol*. As long as you follow the
protocol, it doesn't matter how you build your network device.

The OSI model looks something like this: This model starts just
*above* the raw physics, with the **physical layer**, also known
as **Layer 1**.  The choice of "1" makes sense, because this is the
lowest level we consider. Layers are normally added on top of each
other. For example, if you put six coats of varnish on a piece of
furniture, you're going to have six layers. The first layer you put on
wouldn't sensibly be called "layer 6"; neither does network layering
work that way. Here's a quick rundown of what each layer does.

Most likely, we won't get into details about all the layers, because
the higher you go, the more widely they vary with the user
application. Higher layers don't really help us better understand
networking, any more than watching electrons travel through a wire
help us debug a missing packet.

--------------

Copyright (C) 2024 by Bill Wear; All Rights Reserved
