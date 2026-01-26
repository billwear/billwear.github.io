#+TITLE: MAAS from the CLI
#+AUTHOR: stormrider
#+DUNSEL: this just touches the file: flop
#+HTML_HEAD: <link rel="icon" href="https://stormrider.io/emacs-dragon.png">
#+HTML_HEAD_EXTRA: <link rel="stylesheet" type="text/css" href="https://stormrider.io/css/stylesheet.css">
#+HTML_HEAD_EXTRA: <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" rel="stylesheet"> 
#+OPTIONS: \n:t
# [[./t1.jpg]]
#+MACRO: color @@html:<font color="$1">$2</font>@@

--------
MAAS: [[https://stormrider.io/maas-cli-1.html][Install]] ~ [[https://stormrider.io/maas-cli-2.html][Configure]] ~ [[https://stormrider.io/maas-cli-3.html][DHCP]] ~ [[https://stormrider.io/maas-cli-4.html][Commission]] ~ [[https://stormrider.io/maas-cli-5.html][Deploy]] ~ [[https://stormrider.io/maas-cli-6.html][jq]] ~ [[https://stormrider.io/maas-cli-7.html][SSH]] ~ [[https://stormrider.io/maas-cli-8.html][More jq]]
--------

/Installing MAAS via the command line/

I really want to write docs and create doc tools, and Canonical pays me to do those things for the MAAS project.  I'd really like to share some things with you, off the clock, because I enjoy doing it. 

In this sequence, I'm going to configure MAAS via the command-line only. MAAS has a really nice UI that's super-easy to use, and a CLI backed by a REST API. I'd really like to try to see how much I can do, and how far I can get, using just the CLI.
So my goals for this project are simple: run MAAS through its paces using only the CLI and take good notes.

** Installing MAAS is a CLI thing, anyway

It starts with installation. I'm doing this experiment on my largest laptop, wintermute (named after the character in Neuromancer).  I mention that only because you'll sometimes see that hostname behind the prompt in the examples below.

Let's be naive and start from first installation. I've cleared MAAS off wintermute, as well as PostgreSQL, so I can try a true, out of box experience. I haven't cleaned off libvirt or any of my KVMs I've got on here, nor the bridge I created to network them, because I use those for other things -- and because it's reasonable to expect that someone who's looking at MAAS would have some kind of virtual machine capability around already.

So starting at the top of the MAAS 2.8 install instructions, I'm going to first "install (but not initialize) the MAAS snap":

#+ATTR_HTML: :textarea t :width 80
#+BEGIN_SRC bash
stormrider@wintermute:~$ sudo snap install maas --channel=2.8
maas (2.8/stable) 2.8.1-8567-g.c4825ca06 from Canonical installed
#+END_SRC

Looking over my MAAS initialisation modes, I see that region+rack mode will do fine for this install, as I don't have to add the complexity of separate rack controllers just yet. I can do that later, if I get that far. But it's not quite time to initialise, though; I need to make a decision whether I want a production install or just a proof-of-concept setup. I've already removed PostgreSQL so that I can choose either one.

** Production postgres

For now, I think I'm going with the production configuration (more to see and do), and that starts with a local PostgreSQL install, from packages. And, like most Debian installs, that starts with an update, to grab any packages that might need to be available for the install to succeed:

#+ATTR_HTML: :textarea t :width 80
#+BEGIN_SRC bash
stormrider@wintermute:~$ sudo apt update -y

[sudo] password for stormrider: 
Hit:1 http://dl.google.com/linux/chrome/deb stable InRelease
Hit:2 http://us.archive.ubuntu.com/ubuntu focal InRelease                                      
Get:3 http://security.ubuntu.com/ubuntu focal-security InRelease [107 kB]
Get:4 http://us.archive.ubuntu.com/ubuntu focal-updates InRelease [111 kB]
Get:5 http://us.archive.ubuntu.com/ubuntu focal-backports InRelease [98.3 kB]
Get:6 http://us.archive.ubuntu.com/ubuntu focal-updates/main amd64 Packages [310 kB]
Get:7 http://security.ubuntu.com/ubuntu focal-security/main amd64 DEP-11 Metadata [21.2 kB]
Get:8 http://us.archive.ubuntu.com/ubuntu focal-updates/main i386 Packages [187 kB]     
Get:9 http://us.archive.ubuntu.com/ubuntu focal-updates/main amd64 DEP-11 Metadata [196 kB]
Get:10 http://us.archive.ubuntu.com/ubuntu focal-updates/universe amd64 Packages [142 kB]
Get:11 http://us.archive.ubuntu.com/ubuntu focal-updates/universe i386 Packages [77.6 kB]
Get:12 http://security.ubuntu.com/ubuntu focal-security/universe amd64 DEP-11 Metadata [35.8 kB]
Get:13 http://us.archive.ubuntu.com/ubuntu focal-updates/universe Translation-en [71.7 kB]
Get:14 http://us.archive.ubuntu.com/ubuntu focal-updates/universe amd64 DEP-11 Metadata [176 kB]
Get:15 http://us.archive.ubuntu.com/ubuntu focal-updates/multiverse amd64 DEP-11 Metadata [2,468 B]
Get:16 http://us.archive.ubuntu.com/ubuntu focal-backports/universe amd64 DEP-11 Metadata [1,972 B]
Fetched 1,538 kB in 2s (827 kB/s)                                             
Reading package lists... Done
Building dependency tree       
Reading state information... Done
325 packages can be upgraded. Run 'apt list --upgradable' to see them.
#+END_SRC

Then I can install PostgreSQL, probably version 12 or something like that:

#+ATTR_HTML: :textarea t :width 80
#+BEGIN_SRC bash
stormrider@wintermute:~$ sudo apt install -y postgresql</strong>
      
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following packages were automatically installed and are no longer required:
enchant geoip-database gir1.2-mutter-5 gsfonts libbind9-161 libcroco3 libdns-export1107
libdns1107 libdns1109 libenchant1c2a libfprint0 libgeoip1 libgnome-desktop-3-18 libirs161
libisc-export1104 libisc1104 libisc1105 libisccc161 libisccfg163 liblwres161 libmicrodns0
libmutter-5-0 liboauth0 libpoppler90 libpython3.7 libpython3.7-minimal libpython3.7-stdlib
linux-image-5.3.0-40-generic linux-modules-5.3.0-40-generic
linux-modules-extra-5.3.0-40-generic ubuntu-software ubuntu-system-service
Use 'sudo apt autoremove' to remove them.
Suggested packages:
postgresql-doc
The following NEW packages will be installed:
postgresql
0 upgraded, 1 newly installed, 0 to remove and 325 not upgraded.
Need to get 4,004 B of archives.
After this operation, 67.6 kB of additional disk space will be used.
Get:1 http://us.archive.ubuntu.com/ubuntu focal/main amd64 postgresql all 12+214 [4,004 B]
Fetched 4,004 B in 0s (13.2 kB/s)     
Selecting previously unselected package postgresql.
(Reading database ... 227326 files and directories currently installed.)
Preparing to unpack .../postgresql_12+214_all.deb ...
Unpacking postgresql (12+214) ...
Setting up postgresql (12+214) ...
#+END_SRC

Yep, version 12. I like keeping up. Anyway, now I need to set up a PostgreSQL user:

#+ATTR_HTML: :textarea t :width 80
#+BEGIN_SRC bash
stormrider@wintermute:~$<strong>sudo -u postgres psql -c "CREATE USER \"maascli\" WITH ENCRYPTED PASSWORD 'maascli'"
CREATE ROLE
#+END_SRC

And create a suitable MAAS database:

#+ATTR_HTML: :textarea t :width 80
#+BEGIN_SRC bash
stormrider@wintermute:~$<strong>sudo -u postgres createdb -O "maascli" "maasclidb"
#+END_SRC

Note that there's no system response (the old UNIX rule of "no news is good news"). Next, I need to add the database to the PostgreSQL HBA configuration, by editing `/etc/postgres/12/main/pghba.conf', adding a line to the bottom of the file:

#+ATTR_HTML: :textarea t :width 80
#+BEGIN_SRC bash
stormrider@wintermute:~$<strong>sudo vi /etc/postgresql/12/main/pg_hba.conf</strong>
host    maasclidb       maascli         0/0                     md5
#+END_SRC

** Initialising MAAS

Finally, I can initialise MAAS, like this:

#+ATTR_HTML: :textarea t :width 80
#+BEGIN_SRC bash
stormrider@wintermute:~$<strong>sudo maas init region+rack --database-uri "postgres://maascli:maascli@localhost/maasclidb"
MAAS URL [default=http://192.168.43.251:5240/MAAS]: 
#+END_SRC

This command offers me a bit of important feedback, the MAAS URL, which will be needed for the CLI login. That's followed by a running commentary on the steps MAAS is taking to start up. It all ends with the following admonition:

#+ATTR_HTML: :textarea t :width 80
#+BEGIN_SRC bash
MAAS has been set up.

If you want to configure external authentication or use
MAAS with Canonical RBAC, please run

sudo maas configauth

To create admins when not using external authentication, run

sudo maas createadmin
#+END_SRC

Well, that's an easy call. Let me just run <code>createadmin</code> real quick:

#+ATTR_HTML: :textarea t :width 80
#+BEGIN_SRC bash
stormrider@wintermute:~$<strong>sudo maas createadmin
[sudo] password for stormrider: 
Username: admin
Password: 
Again: 
Email: admin@admin.com
Import SSH keys [] (lp:user-id or gh:user-id): xxxxxxxxxxx
#+END_SRC

** Onward

Next, I'm going to try getting [[https://stormrider.io/maas-cli-2.html][MAAS configured with the CLI]]. Should be fun!
