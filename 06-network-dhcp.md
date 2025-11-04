<style>
body {background-color: linen;}
</style>
# 06 · Networking and DHCP

- [Home](index.html)
- [Install](01-install.html)
- [Login/Config](02-login-config.html)
- [LXD Host](03-lxd-host.html)
- [VM-Host](04-vm-host.html)
- [Compose VMs](05-compose.html)
- [Network/DHCP](06-network-dhcp.html)
- [Commission/Deploy](07-commission-deploy.html)
- [JQ Ops](08-jq-ops.html)
- [Storage](09-storage.html)
- [Advanced Net](10-net-advanced.html)
- [Pools/Zones/Tags](11-pools-zones-tags.html)
- [Notes](12-notes.html)
- [Annotations](13-annotations.html)
    
## Identify your subnet and fabric

```
maas admin subnets read | jq -r '.[] | [.name, .cidr, .vlan.fabric_id, .vlan.id] | @tsv' | column -t
```

## Create a dynamic IP range

```
maas admin ipranges create type=dynamic start_ip=192.168.123.190 end_ip=192.168.123.253
```

## Enable DHCP on the untagged VLAN

```
# find your rack hostname
maas admin rack-controllers read | jq -r '.[].hostname'
# enable DHCP (example uses fabric 2 and rack 'wintermute')
maas admin vlan update 2 untagged dhcp_on=true primary_rack=wintermute
```

**CC BY-NC 2025 stormrider**
