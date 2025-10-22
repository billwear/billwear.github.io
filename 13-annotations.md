<style>
body {background-color: linen;}
<style>
# 13 · Dynamic Annotations

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
    
## Age in days

```
maas admin machines read | jq -r 'def age(d): ((now - (d | sub("\\.\\d+Z$"; "Z") | fromdate)) / 86400 | floor);
(["HOST","STATUS","AGEd","POOL","ZONE"] | (.,map(length*"-"))),
( .[] | [.hostname, .status_name, (age(.created)), .pool.name, .zone.name]) | @tsv' | column -t
```

## Annotate SSH and DHCP

```
maas admin machines read | jq -r '(["HOST","SSH","DHCP","VLAN"] | (.,map(length*"-"))),
(.[] | [ .hostname,
          (if .enable_ssh then "yes" else "no" end),
          (if .boot_interface.links[0].mode=="DHCP" then "yes" else "no" end),
          (.boot_interface.vlan.name) ]) | @tsv' | column -t
```

## Flag machines that need attention

```
maas admin machines read | jq -r '(["HOST","STATUS","ATTN"] | (.,map(length*"-"))),
(.[] | [.hostname, .status_name, (if (.status_name|IN("Failed commissioning","Failed deployment","Broken")) then "!" else "-" end)])
 | @tsv' | column -t
```

**CC BY-NC 2025 stormrider**
