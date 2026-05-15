---

layout: post
title: "The Hidden Server"
date: 2026-04-15

---

My server is a laptop, owned by me, hidden somewhere in the global village. It runs Ubuntu. It cannot be accessed by people in my home, and it's invisible to the public internet. But I can reach it from anywhere on earth. It's the old-skool ultimate in private cloud technology.

No subscription. No monthly bill. No terms of service that change quietly in the night. No data center that knows my business. Just a machine I own, running software I control, reachable only by me.

Here's how that's possible, and why you might want one too.

## The problem with "the cloud"

The cloud is someone else's computer. You know this. Everyone knows this. We collectively shrug and hand our files, our notes, our calendars, our photos, and our work product to corporations whose interests are not identical to ours, because the alternative seemed complicated.

It isn't, anymore.

## The architecture

Three pieces make this work.

**The machine.** Any hardware that can run Linux and stay on. A laptop with the lid closed works fine. Low power draw, no moving parts if you go SSD, silent. Mine has been running for months without a restart.

**The network layer.** This is where most people get stuck. How do you reach a machine that has no public IP, sits behind a NAT router, and has no open ports? The answer is Tailscale — a mesh VPN that uses WireGuard under the hood and handles all the key distribution and NAT traversal you'd otherwise do by hand. Your machines find each other by name, from anywhere, without exposing anything to the public internet. I've written about specific Tailscale setup details separately — the [MagicDNS fix for macOS](https://billwear.github.io/2026/04/15/tailscale-magicdns-on-macos/) and [NFS over Tailscale](https://billwear.github.io/2026/04/15/nfs-over-tailscale/) — but the short version is: install Tailscale, enroll your machines, and they find each other. That's mostly it.

**The interface.** SSH. Emacs. A terminal. The same tools I've been using for decades, now reachable from my Mac, my iPhone, and whatever else is nearest. No app to install. No proprietary client. Just a secure shell into a machine that knows who I am.

## What it actually does

My org-mode files live on the hidden server. My notes live there. My writing drafts live there. When I'm at my desk, I mount the filesystem over NFS and work directly on the files. When I'm away from my desk, I SSH in and work in a terminal. One canonical copy, no sync conflicts, no version confusion, no "which device has the latest draft."

My Syncthing instance runs there, keeping other things synchronized across devices without touching a third-party server. My development environments live there. Anything I want available everywhere but owned by nobody else lives there.

## What it costs

The hardware: whatever you have lying around or can pick up used. A five-year-old laptop with a fresh Ubuntu install and an SSD is more than adequate. The software: free. Tailscale has a generous free tier that covers personal use comfortably. The electricity: negligible — a modern laptop on idle draws very little.

The expertise required: less than you think. If you can install Ubuntu and run a terminal, you can build this. The individual pieces are well-documented. The integration is mostly just Tailscale doing its job.

## Why this matters

Every file you put in Dropbox is readable by Dropbox. Every note in Notion is stored on Notion's servers under Notion's terms. Every document in Google Drive is indexed, analyzed, and retained according to Google's privacy policy, which is long and written by lawyers.

Your own server, invisible to the internet, not kept in your house, reachable only by you, stores your data under exactly one terms of service: yours.  And with tailscale's exit node, you can make that server appear to be somewhere else.  Nice.

All of that used to require real infrastructure expertise. It doesn't anymore. Tailscale solved the hard part.

The rest of this series goes layer by layer through the architecture — network, filesystem, interface, sync, and the org-mode workflow that ties it all together. Each piece stands alone. Together they add up to something that feels, in the best possible way, like taking your data back.

---

*Bill Wear has been running Unix systems since 1974. His server is hidden somewhere in the global village and he'd like to keep it that way.*

---
