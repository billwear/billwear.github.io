<style>
body {background-color: linen;}
<style>
# 04 · Register the LXD VM-host

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
    
## Create the VM-host

```
# substitute your LXD host address and credentials
maas admin vm-hosts create type=lxd power_address=https://10.0.0.10:8443 power_user=ubuntu power_pass=changeme project=maas
```
## List VM-hosts and note the ID

```
maas admin vm-hosts read | jq -r '.[] | [.id, .type, .name, .total.cores, .total.memory, .total.local_storage] | @tsv' | column -t
```

## Set default bridge for new VMs

```
maas admin vm-host update <ID> default_bridge=br0
```

**CC BY-NC 2025 stormrider**
