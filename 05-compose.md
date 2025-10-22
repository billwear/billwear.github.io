# 05 · Compose VMs

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
    
## Compose a VM

```
# example: compose on vm-host id 7 with 2 cores, 4G RAM, 20G disk
maas admin vm-host compose 7 cores=2 memory=4096 storage=20
```

## See new machines in MAAS

```
maas admin machines read | jq -r '(["HOSTNAME","SYSID","STATUS","POOL"] | (.,map(length*"-"))),
(.[] | [.hostname,.system_id,.status_name,.pool.name]) | @tsv' | column -t
```

**CC BY-NC 2025 stormrider**
