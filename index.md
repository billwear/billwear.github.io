---
layout: default
title: "DevRel & Tech Writer"
---

At four years old, I set out to understand things — machines, systems, people, language, why some structures hold and others collapse. Once I understood them, I found immense pleasure in helping others understand and use them.


I'm also an independent DevRel consultant and technical writer — 30 years in the field, six at Canonical as developer advocate for MAAS. [Work with me.](/consulting/)

---

## Proof of work

### Making technical systems legible

**[MAAS from the CLI](/maas-cli-1/)** — Eight-part walkthrough of installing, configuring, and operating bare metal provisioning infrastructure using only the command line. Covers PostgreSQL setup, DHCP, machine commissioning, deployment, SSH/SCP, and two deep-dives into jq for human-readable CLI output. Written while working as developer advocate at Canonical. Includes a [live show-and-tell session](https://discourse.maas.io/t/maas-show-and-tell-using-jq-to-make-human-readable-maas-cli-output/3738) recorded for the MAAS community.


**[Networking Tutorial](/networking/)** — Ground-up explanation of TCP/IP and the OSI model for people who want to understand what's actually happening on the wire. Covers network architecture, Ethernet framing, ARP, IP packets, routing, and TCP — written for operators, not theorists.


**[My Emacs Configuration](/emacs-config/)** — Annotated init.el covering 21 sections: org-roam networked notes, org-babel literate programming in ten languages, org-super-agenda, org-clock, a custom journaling system, and the design philosophy behind all of it. Self-installing on a fresh machine.

---

### Making complex systems legible to everyone else

**[How to think like a grandmaster](https://williamwear.substack.com/p/how-to-think-like-a-grandmaster)** — Chess mastery as a model for pattern compression and working memory management. A grandmaster doesn't think faster — they think in larger pieces of time. The same cognitive architecture applies to any domain where expertise looks like intuition.


**[How to think like an ER physician](https://williamwear.substack.com/p/how-to-think-like-an-er-physician-715)** — Slow thinking in the fastest room on Earth. How emergency physicians build composure under pressure, triage attention, and make irreversible decisions with incomplete information — and what that discipline looks like when you take it out of the ER.


**[How to think like a professional novelist](https://williamwear.substack.com/p/how-to-think-like-a-professional)** — A novelist doesn't track every sentence — they think in shapes of intention. Pattern compression applied to creative work: how to hold an entire structure in working memory and still have bandwidth left to make art.

---

## Recent writing

{% for post in site.posts limit:5 %}
{{ post.date | date: "%B %-d, %Y" }}

### [{{ post.title }}]({{ post.url }})

{{ post.excerpt }}

{% endfor %}