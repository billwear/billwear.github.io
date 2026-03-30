---
layout: page
title: "MAAS from the CLI: Deploying Machines"
permalink: /maas-cli-5/
description: "Acquiring and deploying a commissioned MAAS machine using only the CLI — the full allocate-then-deploy workflow, with JSON output showing each state transition."
series: maas-cli
series_part: 5
---

*Part of a series: [Install](/maas-cli-1/) · [Configure](/maas-cli-2/) · [DHCP](/maas-cli-3/) · [Commission](/maas-cli-4/) · [Deploy](/maas-cli-5/) · [jq](/maas-cli-6/) · [SSH](/maas-cli-7/) · [More jq](/maas-cli-8/)*

---

## Acquiring a machine

Once commissioning finishes, acquire the machine — this assigns ownership to your username:

```bash
stormrider@wintermute:~$ maas admin machines allocate system_id=bhxws3
```

Key fields in the response confirm the machine is ready to deploy:

- `"status_name": "Allocated"` — now owned by admin
- `"ip_addresses": ["192.168.123.190"]` — DHCP assigned an address
- `"commissioning_status_name": "Passed"` — all tests cleared
- `"storage_test_status_name": "Passed"` — disk tests passed
- `"power_state": "off"` — waiting for deploy command

## Deploying the machine

Having acquired the machine, deploy it:

```bash
stormrider@wintermute:~$ maas admin machine deploy bhxws3
```

The response confirms deployment is underway:

- `"status_name": "Deploying"` — OS install in progress
- `"status_message": "Deploying"` — confirmed
- `"distro_series": "bionic"` — deploying Ubuntu 18.04
- `"hwe_kernel": "ga-18.04"` — hardware enablement kernel
- `"current_installation_result_id": 10` — install result being tracked

## What just happened

In sequence, via CLI only:

1. Installed and configured MAAS
2. Started DHCP
3. Created a machine
4. Commissioned it
5. Acquired it
6. Deployed it

No UI touched.

Next up: [using jq to make CLI output human-readable](/maas-cli-6/).