---

layout: post
title: "NFS Over Tailscale: Old-School File Sharing, Zero Exposure"
date: 2026-04-15

---

In 1980, I was architecting NFS for a major oil company out of their New Orleans office. Several hundred thousand Sun workstations — the pizza-box form factor, for those of you who weren't there — stacked on shelves so densely that we had an ongoing informal competition: could we fit more actual pizza boxes or more actual Sun boxes on the same shelf? It was closer than you'd think.

NFS was new. We were figuring it out as we went. And it worked, mostly, until it didn't, and then you learned things about network filesystems that no documentation had bothered to write down yet.

Forty-six years later I am mounting my org-mode files from a Ubuntu server that lives under my bookshelf onto my Mac, over Tailscale, using NFS. Some things are just right.

## Why NFS and Not Syncthing

I already run Syncthing over Tailscale for file synchronization. It's excellent. But there's a difference between syncing files and mounting them. When I mount the org directory from my server, I'm working on one canonical copy. No sync conflicts. No wondering which version is current. The file is where it lives, and I'm reaching into it from wherever I am.

For org-mode specifically — where I want one authoritative task list, one set of notes, one agenda — that matters.

## Why Tailscale Makes This Safe

Raw NFS and the public internet are not friends. NFS was designed for trusted networks, and it shows. Exposing an NFS mount to the world is the kind of thing that keeps security researchers employed.

Tailscale solves this elegantly. Your tailnet is a private mesh — machines on it are authenticated via WireGuard cryptography, not just IP addresses. So you export your NFS share only to the Tailscale CGNAT range (100.64.0.0/10), and only your tailnet machines can see it. No firewall gymnastics. No exposed ports. No drama.

## Setting It Up

**On the server (Ubuntu):**

```bash
sudo apt install nfs-kernel-server
```

Edit `/etc/exports`:

```
/home/bill/org  100.64.0.0/10(rw,sync,no_subtree_check,insecure)
```

The `insecure` flag is required because macOS NFS clients use unprivileged ports by default. This sounds alarming and isn't — you're still locked to the tailnet range.

Apply the export:

```bash
sudo exportfs -ra
sudo systemctl enable --now nfs-kernel-server
```

**On the Mac:**

```bash
mkdir -p ~/mnt/server-org
sudo mount -t nfs server:/home/bill/org ~/mnt/server-org
```

If you get "Operation not permitted," the `insecure` flag is missing from your export. If you get write-protected files, read on.

## The UID Problem

NFS doesn't pass usernames across the wire. It passes numeric user IDs. My Mac thinks I'm uid 501. My server knows me as uid 1000. When the server sees writes coming in from uid 501, it doesn't recognize me, and the files stay read-only.

Fix this by squashing all remote UIDs to your server UID in `/etc/exports`:

```
/home/bill/org  100.64.0.0/10(rw,sync,no_subtree_check,insecure,all_squash,anonuid=1000,anongid=1000)
```

Then:

```bash
sudo exportfs -ra
sudo umount ~/mnt/server-org
sudo mount -t nfs server:/home/bill/org ~/mnt/server-org
```

Now you can write. Check your server UID first with `id bill` on the server side if you're not sure of the number.

## One Honest Caveat

NFS over Tailscale works beautifully when both are running. If Tailscale is down when your Mac boots, and you've put the mount in `/etc/fstab`, you will have a bad morning. Boot hangs waiting for a mount that can't resolve are a classic Unix misery.

My recommendation: don't put it in fstab. Put an alias in your shell config instead:

```bash
alias orgmount='sudo mount -t nfs server:/home/bill/org ~/mnt/server-org'
```

Mount it when you need it. Unmount when you're done (and make sure emacs isn't holding the directory open, or `umount` will tell you the device is busy and it won't be wrong).

## What I'm Actually Using This For

My org files live on the server. I mount them from the Mac when I'm at my desk. I ssh into the server from my phone via Blink Shell when I'm not. One directory, multiple access points, zero sync conflicts, and the same workflow I've been using in one form or another since before most people reading this were born.

NFS isn't glamorous. It doesn't have a slick dashboard or a mobile app or a Kubernetes operator. It's just a network filesystem that works, running over a network layer that works, connecting machines that know each other by name.

Sometimes the old tools are old because they're right.

---

*Bill Wear has been wrangling NFS since it was new. He still thinks pizza boxes were a better form factor.*

---
