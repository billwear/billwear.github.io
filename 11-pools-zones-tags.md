<style>
body {background-color: linen;}
<style>
# 11 · Pools, Zones, and Tags

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
    
## Pools

```
maas admin resource-pools read | jq -r '.[] | [.name, .id, .description] | @tsv' | column -t
maas admin resource-pools create name=lab description="LXD lab pool"
maas admin machine update <SYSID> pool=lab
```

## Zones

```
maas admin zones read | jq -r '.[] | [.name, .description] | @tsv' | column -t
maas admin zones create name=az1 description="rack-1 closet"
maas admin machine update <SYSID> zone=az1
```

## Tags

```
maas admin tags create name=k8s comment="kubernetes workers"
maas admin tag nodes add k8s <SYSID>
maas admin tag nodes remove k8s <SYSID>
```

**CC BY-NC 2025 stormrider**
