---
layout: page
title: "MAAS from the CLI: jq Tricks"
permalink: /maas-cli-6/
description: "Using jq to turn verbose MAAS CLI JSON output into clean, readable tables — a step-by-step walkthrough of filtering, formatting, nested keys, arrays, and chaining with awk and sort."
series: maas-cli
series_part: 6
---

*Part of a series: [Install](/maas-cli-1/) · [Configure](/maas-cli-2/) · [DHCP](/maas-cli-3/) · [Commission](/maas-cli-4/) · [Deploy](/maas-cli-5/) · [jq](/maas-cli-6/) · [SSH](/maas-cli-7/) · [More jq](/maas-cli-8/)*

---

The JSON output from MAAS CLI commands is both consistent and comprehensive, but hard for humans to process — especially at scale. Even one machine's `allocate` or `deploy` output runs many pages. With 10 or 12 machines, it becomes unworkable.

Enter [jq](https://stedolan.github.io/jq/): a command-line tool for filtering and formatting JSON. With jq and a couple of Unix utilities, you can turn that wall of JSON into something like this:

```
HOSTNAME      SYSID   POWER  STATUS     OWNER  TAGS                 POOL     VLAN      FABRIC    SUBNET
--------      -----   -----  ------     -----  ----                 ----     ----      ------    ------
lxd-vm-1      r8d6yp  off    Deployed   admin  pod-console-logging  default  untagged  fabric-1  10.124.141.0/24
lxd-vm-2      tfftrx  off    Allocated  admin  pod-console-logging  default  untagged  fabric-1  10.124.141.0/24
lxd-vm-3      grwpwc  off    Ready      -      pod-console-logging  default  untagged  fabric-1  10.124.141.0/24
lxd-vm-4      6s8dt4  off    Deployed   admin  pod-console-logging  default  untagged  fabric-1  10.124.141.0/24
lxd-vm-5      pyebgm  off    Allocated  admin  pod-console-logging  default  untagged  fabric-1  10.124.141.0/24
lxd-vm-6      ebnww6  off    New        -      pod-console-logging  default  untagged  fabric-1
libvirt-vm-1  m7ffsg  off    Ready      -      pod-console-logging  default  untagged  fabric-1  10.124.141.0/24
libvirt-vm-2  kpawad  off    Ready      -      pod-console-logging  default  untagged  fabric-1  10.124.141.0/24
libvirt-vm-3  r44hr6  error  Ready      -      pod-console-logging  default  untagged  fabric-1  10.124.141.0/24
libvirt-vm-4  s3sdkw  off    Ready      -      pod-console-logging  default  untagged  fabric-1  10.124.141.0/24
libvirt-vm-5  48dg8m  off    Ready      -      pod-console-logging  default  untagged  fabric-1  10.124.141.0/24
libvirt-vm-6  bacx77  on     Deployed   admin  pod-console-logging  default  untagged  fabric-1  10.124.141.0/24
```

The command that produces this covers 99% of routine MAAS information needs. Let's build it from scratch.

---

## Watch it live

This material comes from a live Canonical show-and-tell session.
If you'd rather watch than read:

[MAAS Show and Tell: Using jq to make human-readable MAAS CLI output](https://discourse.maas.io/t/maas-show-and-tell-using-jq-to-make-human-readable-maas-cli-output/3738)
*(Canonical MAAS Discourse, January 2021)*

---

## Basic jq usage

Pull hostnames from all machines, no formatting:

```bash
stormrider@wintermute:~$ maas admin machines read | jq '(.[] | [.hostname])'
```

Output:

```
[
  "lxd-vm-1"
]
[
  "lxd-vm-2"
]
...
```

Two things to note. First, jq instructions are enclosed in single quotes — they can span lines without line continuations:

```bash
maas admin machines read | jq '(.[]
| [.hostname])'
```

Second, `.[]` tells jq it's decoding an array of datasets and should iterate through each one. The pipe (`|`) completes the "for each" construct. The outer brackets in the output represent each machine's dataset boundary.

Adding a second field is just as simple:

```bash
stormrider@wintermute:~$ maas admin machines read | \
  jq '(.[] | [.hostname, .status_name])'
```

Output:

```
[
  "lxd-vm-1",
  "Deployed"
]
[
  "lxd-vm-2",
  "Allocated"
]
...
```

---

## Improved formatting

Most Unix text-processing commands use tabs as field delimiters. The jq `@tsv` filter transforms output records into tab-separated lines:

```bash
maas admin machines read | jq '(.[] | [.hostname, .status_name]) | @tsv'
```

Output:

```
"lxd-vm-1\tDeployed"
"lxd-vm-2\tAllocated"
...
```

Close, but the quotes and `\t` representations aren't human-readable. The `-r` (raw output) flag fixes that:

```bash
maas admin machines read | jq -r '(.[] | [.hostname, .status_name]) | @tsv'
```

Output:

```
lxd-vm-1    Deployed
lxd-vm-2    Allocated
...
```

Pipe to `column -t` to normalize column widths to the longest value in each column:

```bash
maas admin machines read | jq -r \
  '(.[] | [.hostname, .status_name]) | @tsv' | column -t
```

---

## Adding headers

Pass a literal row to jq as the first expression:

```bash
maas admin machines read | jq -r \
  '(["HOSTNAME","STATUS"]),
   (.[] | [.hostname, .status_name]) | @tsv' | column -t
```

Output:

```
HOSTNAME      STATUS
lxd-vm-1      Deployed
lxd-vm-2      Allocated
...
```

Add a horizontal rule using `map(length*"-")`:

```bash
maas admin machines read | jq -r \
  '(["HOSTNAME","STATUS"] | (.,map(length*"-"))),
   (.[] | [.hostname, .status_name]) | @tsv' | column -t
```

Output:

```
HOSTNAME      STATUS
--------      ------
lxd-vm-1      Deployed
...
```

---

## Handling null values

Only allocated or deployed machines have an owner. Unowned machines return `null`, which breaks column alignment. The jq alternate-value construct `a // "b"` means "if not a, use b":

```bash
maas admin machines read | jq -r \
  '(["HOSTNAME","STATUS","OWNER","SYSTEM-ID"] | (.,map(length*"-"))),
   (.[] | [.hostname, .status_name, .owner // "-", .system_id])
   | @tsv' | column -t
```

Output:

```
HOSTNAME      STATUS     OWNER  SYSTEM-ID
--------      ------     -----  ---------
lxd-vm-1      Deployed   admin  r8d6yp
lxd-vm-3      Ready      -      grwpwc
...
```

---

## Nested arrays

Tags are stored as a nested array:

```json
"tag_names": [
    "pod-console-logging",
    "virtual"
],
```

Use `tag_names[0]` to get the first tag:

```bash
.tag_names[0] // "-"
```

Note: use underscores in column headers to prevent `column -t` from splitting on spaces — `FIRST_TAG` not `FIRST TAG`.

---

## Nested keys

Some values aren't top-level key-value pairs. The pool, for example:

```json
"pool": {
    "name": "default",
    "description": "Default pool",
    "id": 0,
    ...
}
```

Asking for `.pool` directly causes an error. Use dot notation to reach the actual value:

```bash
.pool.name
```

---

## Doubly-nested keys

VLAN and fabric names are nested inside `boot_interface`:

```json
"boot_interface": {
    "vlan": {
        "name": "untagged",
        "fabric": "fabric-1",
        ...
    }
}
```

Access them with double indirection:

```bash
.boot_interface.vlan.name
.boot_interface.vlan.fabric
```

---

## Deeply nested values

The subnet CIDR is buried inside `boot_interface.links[]`:

```json
"boot_interface": {
    "links": [
        {
            "subnet": {
                "name": "10.124.141.0/24",
                ...
            }
        }
    ]
}
```

Access the first element of the links array:

```bash
.boot_interface.links[0].subnet.name
```

---

## The complete table command

Putting it all together:

```bash
maas admin machines read | jq -r '(["HOSTNAME","SYSID","POWER","STATUS",
"OWNER", "TAGS", "POOL", "VLAN","FABRIC","SUBNET"] | (., map(length*"-"))),
(.[] | [.hostname, .system_id, .power_state, .status_name, .owner // "-",
.tag_names[0] // "-", .pool.name,
.boot_interface.vlan.name, .boot_interface.vlan.fabric,
.boot_interface.links[0].subnet.name]) | @tsv' | column -t
```

---

## Sorting with awk

To sort by hostname while keeping headers pinned at the top, use `awk` to sort only rows after the first two:

```bash
maas admin machines read | jq -r '(["HOSTNAME","SYSID","POWER","STATUS","OWNER",
"TAGS", "POOL", "VLAN","FABRIC","SUBNET"] | (., map(length*"-"))),(.[] |
[.hostname, .system_id, .power_state, .status_name, .owner // "-",
.tag_names[0] // "-", .pool.name, .boot_interface.vlan.name,
.boot_interface.vlan.fabric,.boot_interface.links[0].subnet.name])
| @tsv' | column -t | awk 'NR<3{print $0;next}{print $0| "sort -k 1"}'
```

Change `-k 1` to `-k 4` to sort by status, `-k 5` for owner, and so on.

---

jq is a simple but powerful tool for working with MAAS CLI output. And since it outputs plain text, anything you can do with text output in Unix, you can do with jq results. Next up: [SSH and SCP with deployed machines](/maas-cli-7/).