---
layout: default
title: "Coder, DevRel & Tech Writer"
---

Making systems usable and legible for the people who need them.

30 years in the field. Six at Canonical as developer advocate for MAAS. 
Independent consultant now. [Work with me.](https://billwear.github.io/consulting/)

---

## Proof of work

**[MAAS from the CLI](https://billwear.github.io/maas-cli-1/)** — Eight-part walkthrough of bare metal provisioning infrastructure from the command line.

**[Networking Tutorial](https://billwear.github.io/networking/)** — Ground-up TCP/IP and OSI for operators, not theorists.

**[My Emacs Configuration](https://billwear.github.io/emacs-config/)** — Annotated, modular, self-installing init system covering 21 sections.

---

## What I'm into right now

**Tailscale**
[MagicDNS on macOS: The Missing Fifteen Minutes](https://billwear.github.io/2026/04/15/tailscale-magicdns-on-macos/)

[NFS Over Tailscale: Old-School File Sharing, Zero Exposure](https://billwear.github.io/2026/04/15/nfs-over-tailscale/)

**Emacs**
[My Emacs Configuration](https://billwear.github.io/emacs-config/)

---

## Recent writing

{% for post in site.posts limit:3 %}
### [{{ post.title }}]({{ post.url }})
{{ post.date | date: "%B %d, %Y" }} — {{ post.excerpt | strip_html | truncatewords: 30 }}
{% endfor %}

[All posts →](https://billwear.github.io/archive/)
