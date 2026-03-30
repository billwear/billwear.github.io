---
layout: page
title: "MAAS from the CLI: SSH and SCP"
permalink: /maas-cli-7/
description: "Logging into deployed MAAS machines via SSH and copying files with SCP — including creating a VM host, composing machines, commissioning with SSH keys enabled, and deploying a script."
series: maas-cli
series_part: 7
---

*Part of a series: [Install](/maas-cli-1/) · [Configure](/maas-cli-2/) · [DHCP](/maas-cli-3/) · [Commission](/maas-cli-4/) · [Deploy](/maas-cli-5/) · [jq](/maas-cli-6/) · [SSH](/maas-cli-7/) · [More jq](/maas-cli-8/)*

---

Now that we have running machines, what if we set ourselves up to SSH into one? This also unlocks `scp` for file transfers — a practical starting point for provisioning.

## Creating a VM host

Start by creating a vm-host. A useful lesson in CLI discovery:

```bash
maas admin vm-host create
```

Wrong subcommand — `create` isn't valid for `vm-host` (singular). The collection form is what adds new entries:

```bash
maas admin vm-hosts create
```

Better, but we need to specify a type:

```
{"type": ["This field is required."]}
```

For an LXD vm-host:

```bash
maas admin vm-hosts create type=lxd
```

Still needs one more thing:

```
{"power_address": ["This field is required."]}
```

The `power_address` for LXD is `https://<gateway-ip>:8443`. The 8443 is the default port from `lxd init`. In my case:

```bash
maas admin vm-hosts create type=lxd power_address=https://10.38.31.1:8443
```

Success. The key line in the JSON response:

```json
"resource_uri": "/MAAS/api/2.0/pods/7/"
```

The vm-host ID is `7` — needed for the next step.

A note on terminology: vm-hosts were originally called "pods" (hence the URI), then "KVM hosts," then "VM hosts" as MAAS expanded beyond libvirt to support LXD. The MAAS CLI reflects all three eras in various places.

## Composing a machine

With a VM host, we need a virtual machine. The compose command is on `vm-host` (singular), not `machines`:

```bash
maas admin vm-host compose --help
```

This reveals a rich set of options — cores, memory, storage, interfaces, NUMA pinning, and more. For now, all we need is the vm-host ID:

```bash
maas admin vm-host compose 7
```

Success:

```json
{
    "system_id": "xttpfx",
    "resource_uri": "/MAAS/api/2.0/machines/xttpfx/"
}
```

Check its status with our jq table command:

```bash
HOSTNAME    SYSID   POWER  STATUS   OWNER  TAGS     POOL     VLAN      FABRIC    SUBNET
--------    -----   -----  ------   -----  ----     ----     ----      ------    ------
native-cub  xttpfx  on     Testing  admin  virtual  default  untagged  fabric-1  10.38.31.0/24
```

By the time I finished typing the command, commissioning had nearly completed. Running it again:

```
native-cub  xttpfx  off    Ready   -      virtual  default  untagged  fabric-1  10.38.31.0/24
```

## Commissioning with SSH enabled

The machine is Ready but powered off, and SSH keys weren't loaded during commissioning. Fix that by recommissioning with SSH enabled — and leaving the machine powered on afterward:

```bash
maas admin machine commission xttpfx enable_ssh=1
```

After it finishes:

```
native-cub  xttpfx  on     Ready   -      virtual  default  untagged  fabric-1  10.38.31.0/24
```

Ready and powered on.

## Finding the IP address

Several ways to get the IP. The easiest is `lxc list`:

```bash
lxc list
```

Output:

```
+------------+---------+---------------------+-----------------------------------------------+-----------------+-----------+
|    NAME    |  STATE  |        IPV4         |                     IPV6                      |      TYPE       | SNAPSHOTS |
+------------+---------+---------------------+-----------------------------------------------+-----------------+-----------+
| first-one  | RUNNING | 10.38.31.193 (eth0) |                                               | CONTAINER       | 0         |
+------------+---------+---------------------+-----------------------------------------------+-----------------+-----------+
| native-cub | RUNNING | 10.38.31.202 (eth0) | fd42:fd4c:6ab9:19bc:216:3eff:fe9e:bc7b (eth0) | VIRTUAL-MACHINE | 0         |
+------------+---------+---------------------+-----------------------------------------------+-----------------+-----------+
```

Our machine is `10.38.31.202`. Note the distinction: `CONTAINER` vs `VIRTUAL-MACHINE`. Both show up here.

## Logging in via SSH

```bash
ssh ubuntu@10.38.31.202
```

First-login fingerprint prompt — say yes:

```
Warning: Permanently added '10.38.31.202' (ECDSA) to the list of known hosts.
Welcome to Ubuntu 20.04.1 LTS (GNU/Linux 5.4.0-64-generic x86_64)
...
ubuntu@native-cub:~$
```

Always use the `ubuntu` user for MAAS-deployed machines.

## Copying files with SCP

The home directory on the new machine is empty. Exit, create a test file locally, and copy it over:

```bash
ubuntu@native-cub:~$ exit
stormrider@wintermute:~$ touch zork
stormrider@wintermute:~$ scp ./zork ubuntu@10.38.31.202:
zork     100%    0     0.0KB/s   00:00
```

Log back in and verify:

```bash
ubuntu@native-cub:~$ ls
zork
```

## Copying files to a deployed machine

Files copied to a commissioned machine don't survive deployment — the machine gets wiped and reloaded. Acquire and deploy first:

```bash
maas admin machines allocate system_id=xttpfx
maas admin machine deploy xttpfx
```

When it reaches Deployed state, the SSH key has changed. You'll see:

```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
```

Expected — the machine was reloaded. Just do what it says:

```bash
ssh-keygen -f "/home/stormrider/.ssh/known_hosts" -R "10.38.31.2"
ssh ubuntu@10.38.31.2
```

You're in.

## Running a script on a deployed machine

Install a few packages on the deployed machine:

```bash
sudo apt install fortune-mod ddate cowsay
```

Then exit, create a local script called `motd.sh`:

```bash
#!/bin/bash
ddate > /tmp/foo
echo '   ' >> /tmp/foo
fortune -s >> /tmp/foo
cat /tmp/foo | cowsay
```

Make it executable and copy it over:

```bash
chmod 777 motd.sh
scp ./motd.sh ubuntu@10.38.31.2:
```

Log in and run it:

```bash
ubuntu@native-cub:~$ ./motd.sh
```

Output:

```
 ________________________________________
/ Today is Boomtime, the 32nd day of     \
| Chaos in the YOLD 3187                 |
|                                        |
| Water, taken in moderation cannot hurt |
| anybody.                               |
|                                        |
\ -- Mark Twain                          /
 ----------------------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

This is one method MAAS users rely on to configure deployed machines — scripts scped over and kicked off. There are more sophisticated approaches, but this demonstrates the basic workflow.

Next up: [more jq tricks](/maas-cli-8/).