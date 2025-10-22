<style>
body {background-color: linen;}
<style>
# 09 · Storage (CLI)

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
    
## List block devices

```
maas admin block-devices read <SYSID> | jq -r '.[] | [.id, .name, .model, .size, .used_for] | @tsv' | column -t
```

## Choose a boot disk and set GPT

```
maas admin block-device set-boot-disk <SYSID> &lt;DEVID&gt;
maas admin block-device update <SYSID> &lt;DEVID&gt; partition_table=gpt
```
## Create partitions

```
# 512M EFI, 20G root, remainder home
maas admin partitions create <SYSID> &lt;DEVID&gt; size=536870912 bootable=true
maas admin partitions create <SYSID> &lt;DEVID&gt; size=$((20*1024*1024*1024))
maas admin partitions create <SYSID> &lt;DEVID&gt;
```

## Filesystems and mount points

```
maas admin filesystem create <SYSID> &lt;PARTID2&gt; fstype=ext4 mount_point=/
maas admin filesystem create <SYSID> &lt;PARTID3&gt; fstype=ext4 mount_point=/home
```

**CC BY-NC 2025 stormrider**
