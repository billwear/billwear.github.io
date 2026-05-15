---
layout: page
title: "MAAS from the CLI: Installing MAAS"
permalink: /maas-cli-1/
description: "Installing MAAS via the command line, including PostgreSQL setup, initialisation, and creating an admin account — a hands-on walkthrough of the full production install process."
series: maas-cli
series_part: 1
---

*Part of a series: [Install](/maas-cli-1/) · [Configure](/maas-cli-2/) · [DHCP](/maas-cli-3/) · [Commission](/maas-cli-4/) · [Deploy](/maas-cli-5/) · [jq](/maas-cli-6/) · [SSH](/maas-cli-7/) · [More jq](/maas-cli-8/)*

---

I really like to write docs and demonstrate APIs. Canonical paid me to do both of those things for the MAAS project. I also like to share some things off the clock, because I enjoy doing it.

This is one of those "off-the-clock" things that they first said, "Oh, we don't need that."  Then, when I took it down, they immediately said, "Hey, what happened to that CLI walkthrough?"  Same with the networking tutorial elsewhere on this site.  It happens.

In this sequence, I'm going to configure MAAS via the command line only. MAAS has a really nice UI that's super-easy to use, and a CLI backed by a REST API. I'd like to see how much I can do, and how far I can get, using just the CLI. My goals are simple: run MAAS through its paces using only the CLI and take good notes.

## Installing MAAS is a CLI thing, anyway

It starts with installation. I'm doing this on my largest laptop, `wintermute` (named after the character in Neuromancer). You'll sometimes see that hostname behind the prompt in the examples below.

Starting from first installation — I've cleared MAAS and PostgreSQL off `wintermute` for a true out-of-box experience. I haven't cleared libvirt or my KVMs, nor the bridge I created to network them, because I use those for other things — and because it's reasonable to expect that someone looking at MAAS would already have some virtual machine capability around.

Starting at the top of the MAAS 2.8 install instructions, first "install (but not initialize) the MAAS snap":

```bash
stormrider@wintermute:~$ sudo snap install maas --channel=2.8
maas (2.8/stable) 2.8.1-8567-g.c4825ca06 from Canonical installed
```

Looking over the MAAS initialisation modes, `region+rack` will do fine for this install — no need to add the complexity of separate rack controllers just yet. But it's not quite time to initialise; I need to decide between a production install and a proof-of-concept setup.

## Production PostgreSQL

Going with the production configuration (more to see and do). That starts with a local PostgreSQL install. Like most Debian installs, that starts with an update:

```bash
stormrider@wintermute:~$ sudo apt update -y
```

Then install PostgreSQL:

```bash
stormrider@wintermute:~$ sudo apt install -y postgresql
```

Yep, version 12. Now set up a PostgreSQL user:

```bash
stormrider@wintermute:~$ sudo -u postgres psql -c \
  "CREATE USER \"maascli\" WITH ENCRYPTED PASSWORD 'maascli'"
CREATE ROLE
```

And create a suitable MAAS database:

```bash
stormrider@wintermute:~$ sudo -u postgres createdb -O "maascli" "maasclidb"
```

No system response — the old Unix rule of "no news is good news."

Next, add the database to the PostgreSQL HBA configuration by editing `/etc/postgresql/12/main/pg_hba.conf` and adding this line to the bottom:

```
host    maasclidb       maascli         0/0                     md5
```

## Initialising MAAS

Now initialise MAAS:

```bash
stormrider@wintermute:~$ sudo maas init region+rack \
  --database-uri "postgres://maascli:maascli@localhost/maasclidb"
MAAS URL [default=http://192.168.43.251:5240/MAAS]:
```

This offers an important piece of feedback: the MAAS URL, which will be needed for the CLI login. After a running commentary on startup steps, it ends with:

```
MAAS has been set up.

If you want to configure external authentication or use
MAAS with Canonical RBAC, please run

  sudo maas configauth

To create admins when not using external authentication, run

  sudo maas createadmin
```

Easy call. Run `createadmin`:

```bash
stormrider@wintermute:~$ sudo maas createadmin
Username: admin
Password:
Again:
Email: admin@admin.com
Import SSH keys [] (lp:user-id or gh:user-id): xxxxxxxxxxx
```

## Onward

Next: [getting MAAS configured with the CLI](/maas-cli-2/).