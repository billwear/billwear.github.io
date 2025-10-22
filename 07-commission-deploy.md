# 07 · Commission and Deploy

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
    
## Commission

```
maas admin machine commission <SYSID> enable_ssh=true testing_scripts="none"
```

## Deploy Ubuntu 24.04 (noble)

```
USER_DATA=$(base64 -w0 <&lt;'YAML'
#cloud-config
users:
  - name: ubuntu
    groups: sudo
    shell: /bin/bash
    sudo: "ALL=(ALL) NOPASSWD:ALL"
    ssh_import_id: gh:your-github-username
YAML
)
maas admin machine deploy <SYSID> os=ubuntu release=noble user_data="$USER_DATA"
```

## SSH in

```
ssh ubuntu@ace-01
```

**CC BY-NC 2025 stormrider**
