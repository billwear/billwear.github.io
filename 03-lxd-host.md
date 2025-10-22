# 03 · Prepare the LXD Host

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
    
## Install and initialize LXD

```
sudo snap install lxd
sudo lxd init --auto
```
## Enable the HTTPS API and set a trust password

```
lxc config set core.https_address :8443
lxc config set core.trust_password "changeme"
```
## Create or verify a bridge

```
# list networks
lxc network list
# create a bridge (example: br0 on 192.168.123.0/24)
lxc network create br0 ipv4.address=192.168.123.1/24 ipv4.nat=false ipv6.address=none
```

**CC BY-NC 2025 stormrider**
