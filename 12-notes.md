<style>
body {background-color: linen;}
<style>
# 12 · Notes and Metadata

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
    
## Machine description

```
maas admin machine update <SYSID> description="Intel NUC under the TV; 500G SSD; noisy fan"
```

## Tag comments

```
maas admin tag update k8s comment="K8s workers; GPU-ready"
```

## Drop an /etc/motd note at deploy

```
USER_DATA=$(base64 -w0 <<'YAML'
#cloud-config
write_files:
  - path: /etc/motd.d/99-operator-note
    permissions: "0644"
    content: |
      Welcome to ace-01; owner: stormrider; zone: az1; pool: lab
YAML
)
maas admin machine deploy <SYSID> os=ubuntu release=noble user_data="$USER_DATA"
```

**CC BY-NC 2025 stormrider**
