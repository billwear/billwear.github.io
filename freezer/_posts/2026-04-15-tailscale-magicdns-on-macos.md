---
layout: post
title: "Tailscale MagicDNS on macOS: The Missing Fifteen Minutes"
date: 2026-04-15
---

You know what's exhausting? Port forwarding. VPN configurations that require a theology degree. Keeping track of IP addresses like it's 1987 and you're a sysadmin with a laminated card on your monitor.

Tailscale fixes all of that. It's a mesh VPN that sits on top of WireGuard, handles all the key distribution you'd otherwise do by hand, punches through NATs like they owe it money, and makes your machines talk to each other by name from anywhere on earth. It's the networking tool I didn't know I needed until I had it, and now I can't imagine running without it.

My Ubuntu server lives under my bookshelf. I ssh into it from my Mac, my iPhone, and whatever laptop is nearest, from wherever I happen to be. No port forwarding. No exposed public IP. No drama. Just `ssh server` and I'm in.

Mostly.

## The Part They Don't Warn You About

Tailscale has a feature called MagicDNS. The idea is simple and genuinely magical: instead of `ssh 100.114.120.37`, you type `ssh server`. Tailscale handles the name resolution internally. Your machines know each other by name. It's lovely.

Except on macOS, it sometimes isn't.

You enable MagicDNS in the admin console. You check the box. You feel good about yourself. You type `ssh server`. And you get:

```
ssh: Could not resolve hostname server: nodename nor servname provided, or not known
```

The fun part? `tailscale ping server` works fine. The connection is there. The DNS is just... not.

## What's Actually Wrong

macOS resolves split-DNS domains using files in `/etc/resolver/`. For each domain Tailscale manages, there should be a file pointing macOS at Tailscale's internal DNS resolver at `100.100.100.100`.

Check what you've got:

```bash
ls /etc/resolver/
```

If you installed Tailscale via Homebrew rather than the Mac App Store — which is the correct and noble choice, because GUI everything is a trap — you may find only `search.tailscale` sitting there. The file for your actual tailnet domain is missing.

You can confirm the resolver itself works fine:

```bash
dig server.yourtailnet.ts.net @100.100.100.100
```

If that returns your machine's Tailscale IP, the resolver is healthy. macOS just isn't asking it.

## The Fix

Create the missing file manually:

```bash
sudo tee /etc/resolver/yourtailnet.ts.net << EOF
nameserver 100.100.100.100
EOF
```

Replace `yourtailnet.ts.net` with your actual tailnet domain — you can find it in `tailscale status` or the admin console.

Then flush the DNS cache so macOS notices:

```bash
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

Now try:

```bash
ssh server
```

That's it. Fifteen minutes of confusion, two commands to fix.

## Why I think this happens

The GUI version of the Tailscale Mac app obviously creates and manages that resolver file automatically. My guess is that the Homebrew version installs the daemon without the app wrapper, so the file never gets created. Toggling MagicDNS off and on in the admin console doesn't help because there's nothing on the Mac side listening for that signal.

This is not a criticism of Tailscale. It's a criticism of macOS split-DNS, which has always been a little eccentric. Tailscale is otherwise so seamless that when it isn't, you assume you did something wrong. You didn't. You just need the file.

## While You're At It

Once MagicDNS works, set up short names in the admin console so you're typing `ssh server` instead of `ssh downpour-1.tail11e7ad.ts.net`. Go to your machine list, click the machine, edit the name. Done.

Then go do something useful with the hour you just saved by not configuring a traditional VPN.

---

*Bill Wear has been ssh-ing into things since before most of his readers were born. He runs Tailscale on everything and recommends you do the same.*

---
