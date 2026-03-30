---
layout: page
title: "MAAS from the CLI: Commissioning Machines"
permalink: /maas-cli-4/
description: "Creating and commissioning machines in MAAS using only the CLI — machine creation parameters, retrieving system IDs with jq, and triggering commissioning from the command line."
series: maas-cli
series_part: 4
---

*Part of a series: [Install](/maas-cli-1/) · [Configure](/maas-cli-2/) · [DHCP](/maas-cli-3/) · [Commission](/maas-cli-4/) · [Deploy](/maas-cli-5/) · [jq](/maas-cli-6/) · [SSH](/maas-cli-7/) · [More jq](/maas-cli-8/)*

---

In order to deploy machines, I've got to create some and commission them. Normally I'd do that with the UI, but for this exercise I'm attempting it entirely with the CLI.

## Creating a machine

```bash
stormrider@wintermute:~$ maas admin machines create \
  architecture=amd64 \
  mac_addresses=52:54:00:15:36:f2 \
  power_type=virsh \
  power_parameters_power_id=f677a842-571c-4e65-adc9-11e2cf92d363 \
  power_parameters_power_address=qemu+ssh://stormrider@192.168.123.1/system \
  power_parameters_power_pass=xxxxxxxx
```

Success. The machine starts commissioning immediately, just as if I'd created it from the UI. The JSON output is lengthy — the key fields to note are:

- `"status_message": "Commissioning"` — it's already running
- `"system_id": "bhxws3"` — you'll need this for subsequent commands
- `"hostname": "ace-swan"` — MAAS auto-assigns a two-word hostname
- `"architecture": "amd64/generic"` — confirmed

A lot of parameters are a little hard to discover. They may be somewhere in the documentation, or buried in one of the `read` outputs. I used `--help` and a couple of other commands to discover the `power_pass` parameter, for example, though I later found it elsewhere in the docs. Doc is always a work in progress, I guess.

## Retrieving the system ID

So now I have a machine in the "Ready" state, but I'd like to get familiar with commissioning via the CLI. All I really need is the system ID — which is the last element in the `resource_uri` from the JSON above. But just for practice, let's retrieve it using the CLI:

```bash
stormrider@wintermute:~$ maas admin machines read | \
  jq '.[] | .hostname, .system_id'
"ace-swan"
"bhxws3"
```

## Commissioning via the CLI

Now use that system ID to commission the machine:

```bash
stormrider@wintermute:~$ maas admin machine commission bhxws3
```

Success. The JSON output confirms:

- `"status_message": "Commissioning"` — running
- `"commissioning_status_name": "Pending"` — tests queued
- `"bios_boot_method": "pxe"` — PXE boot confirmed
- `"power_state": "off"` — machine is being powered on by MAAS

The commissioning process discovers and records hardware: CPU count, memory, block devices, network interfaces, NUMA nodes. By the time it finishes, MAAS will know exactly what it's working with.

And that's it — that easy. It takes a minute to gather all the parameters for machine creation, but commissioning itself is a single command once you have the system ID.

Next up: [acquiring and deploying the machine](/maas-cli-5/).