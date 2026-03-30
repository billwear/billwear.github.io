---
layout: page
title: "MAAS from the CLI: Enabling DHCP"
permalink: /maas-cli-3/
description: "Enabling DHCP for MAAS using only the CLI — finding the fabric ID, identifying the rack controller, defining a dynamic IP range, and switching DHCP on."
series: maas-cli
series_part: 3
---

*Part of a series: [Install](/maas-cli-1/) · [Configure](/maas-cli-2/) · [DHCP](/maas-cli-3/) · [Commission](/maas-cli-4/) · [Deploy](/maas-cli-5/) · [jq](/maas-cli-6/) · [SSH](/maas-cli-7/) · [More jq](/maas-cli-8/)*

---

The whole point is to get machines deployed. The next step is getting DHCP working, which means finding the untagged VLAN. At this point there should still be only one.

To turn on DHCP, I need two things besides the VLAN name (`untagged`): the fabric ID and the primary rack controller name. All fabrics will be on the same untagged VLAN at this point, so any fabric will do. I can find a valid fabric ID by reading it from any subnet — I'll use `192.168.123.0/24`, the subnet for my virtual bridge:

```bash
stormrider@wintermute:~$ maas admin subnet read 192.168.123.0/24 | grep fabric_id
"fabric_id": 2,
```

Now find the primary rack controller name. It's probably my laptop hostname, but let's get it properly:

```bash
stormrider@wintermute:~$ maas admin rack-controllers read | \
  grep hostname | cut -d '"' -f 4
wintermute
```

With fabric ID `2` and rack controller `wintermute`, let's try enabling DHCP:

```bash
stormrider@wintermute:~$ maas admin vlan update 2 untagged \
  dhcp_on=True primary_rack=wintermute
{"dhcp_on": ["dhcp can only be turned on when a dynamic IP range is defined."]}
```

Right. Need to define a dynamic IP range first. Using the `192.168.123.0/24` subnet, I'll assign `192.168.123.190` to `192.168.123.253`:

```bash
stormrider@wintermute:~$ maas admin ipranges create \
  type=dynamic \
  start_ip=192.168.123.190 \
  end_ip=192.168.123.253
Success.
Machine-readable output follows:
{
    "subnet": {
        "name": "192.168.123.0/24",
        "description": "",
        "vlan": {
            "vid": 0,
            "mtu": 1500,
            "dhcp_on": false,
            "external_dhcp": null,
            "relay_vlan": null,
            "fabric": "fabric-2",
            "primary_rack": null,
            "name": "untagged",
            "id": 5003,
            "space": "undefined",
            "secondary_rack": null,
            "fabric_id": 2,
            "resource_uri": "/MAAS/api/2.0/vlans/5003/"
        },
        "cidr": "192.168.123.0/24",
        "rdns_mode": 2,
        "gateway_ip": null,
        "dns_servers": [],
        "allow_dns": true,
        "allow_proxy": true,
        "active_discovery": false,
        "managed": true,
        "id": 4,
        "space": "undefined",
        "resource_uri": "/MAAS/api/2.0/subnets/4/"
    },
    "type": "dynamic",
    "start_ip": "192.168.123.190",
    "end_ip": "192.168.123.253",
    "user": {
        "is_superuser": true,
        "username": "admin",
        "email": "admin@admin.com",
        "is_local": true,
        "resource_uri": "/MAAS/api/2.0/users/admin/"
    },
    "comment": "",
    "id": 1,
    "resource_uri": "/MAAS/api/2.0/ipranges/1/"
}
```

Now try the DHCP switch again:

```bash
stormrider@wintermute:~$ maas admin vlan update 2 untagged \
  dhcp_on=True primary_rack=wintermute
Success.
Machine-readable output follows:
{
    "vid": 0,
    "mtu": 1500,
    "dhcp_on": true,
    "external_dhcp": null,
    "relay_vlan": null,
    "fabric": "fabric-2",
    "space": "undefined",
    "primary_rack": "8dwnne",
    "secondary_rack": null,
    "name": "untagged",
    "fabric_id": 2,
    "id": 5003,
    "resource_uri": "/MAAS/api/2.0/vlans/5003/"
}
```

`dhcp_on: true`. Confirmed in the UI as well. DHCP is enabled.

Next up: [commissioning machines](/maas-cli-4/).