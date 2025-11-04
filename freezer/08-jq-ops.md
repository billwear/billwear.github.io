<style>
body {background-color: linen;}
</style>
# 08 · jq for Operations

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
    
## Readable inventory

```
maas admin machines read | jq -r '(["HOSTNAME","SYSID","POWER","STATUS","OWNER","POOL","VLAN"]
 | (., map(length*"-"))),
 (sort_by(.hostname)[] | [.hostname,.system_id,.power_state,.status_name, (.owner // "-"), .pool.name, .boot_interface.vlan.name])
 | @tsv' | column -t
```

## Filter to Ready

```
maas admin machines read | jq -r '.[] | select(.status_name=="Ready") | [.hostname,.system_id] | @tsv'
```

## Sort by multiple fields

```
maas admin machines read | jq -r '(sort_by(.pool.name, .hostname)[] | [.hostname, .pool.name, .zone.name]) | @tsv' | column -t
```

**CC BY-NC 2025 stormrider**
