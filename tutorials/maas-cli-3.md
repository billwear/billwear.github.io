# MAAS via the CLI

[Install](maas-cli-1.md)

[Configure](maas-cli-2.md)

[DHCP](maas-cli-3.md)

[Commission](maas-cli-4.md)

[Deploy](maas-cli-5.md)

[jq](maas-cli-6.md)

[SSH](maas-cli-7.md)

[More jq](maas-cli-8.md)

------------------------------------------------------------------------

*Enabling DHCP for MAAS with the CLI*

Of course, the whole point here is to get machines deployed. The next
step is to get DHCP working, which means I have to find the untagged
VLAN. In truth, it shouldn\'t be too hard, because at this point, there
still should only be one.

In order to turn on DHCP, I need to know two things besides the VLAN
name (\"untagged\"): I need to know the fabric ID and the primary rack
controller name. Actually, to start with, all the fabrics will be on the
same untagged VLAN, so any fabric will do. In turn, I can find a valid
fabric ID by reading it from any subnet, so I\'ll just pick one I know
(192.168.123.0/24, the subnet for my virtual bridge). That means I can
find a usable fabric ID like this:

``` bash
stormrider@wintermute:~$  maas admin subnet read 192.168.123.0/24 | grep fabric_id 
"fabric_id": 2,
```

Then I need to find the name of the primary rack controller. I think
it\'s going to be my laptop hostname, but for purposes of argument,
I\'ll assume that I don\'t know it and get it this way:

``` bash
stormrider@wintermute:~$  maas admin rack-controllers read | grep hostname | cut -d '"' -f 4 
wintermute
```

So this would mean I should be able to turn on DHCP like this:

``` bash
stormrider@wintermute:~$ maas admin vlan update 2 untagged dhcp_on=True primary_rack=wintermute 
{"dhcp_on": ["dhcp can only be turned on when a dynamic IP range is defined."]}
```

Hmm. I need to define a dynamic IP range for this to work. Well, given
that my virtual bridge is on 192.168.123.0/24, I think I\'ll just use
that subnet, so let me choose, say, 192.168.123.190 to 192.168.123.253:

``` bash
stormrider@wintermute:~$  maas admin ipranges create type=dynamic start_ip=192.168.123.190 end_ip=192.168.123.253 
```

The result of this command is:

``` bash
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

Okay, now let\'s try that DHCP switch-on one more time:

``` bash
stormrider@wintermute:~$  maas admin vlan update 2 untagged dhcp_on=True primary_rack=wintermute 
```

Now I get something more like I\'d like:

``` bash
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

It says success, and when I look at the UI? Yes, indeed, DHCP is
enabled. Okay, let\'s see if I can [get some machines
commissioned](https://stormrider.io/maas-cli-4.html).
