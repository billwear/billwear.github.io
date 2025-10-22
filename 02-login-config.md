<style>
body {background-color: linen;}
<style>
# 02 · Log In and Configure

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
    
## Log in and get real help

```
sudo maas apikey --username=admin > ~/.maas-api
maas login admin http://127.0.0.1:5240/MAAS/api/2.0/ < ~/.maas-api
maas admin --help
```
## Set DNS forwarders

```
maas admin maas set-config name=upstream_dns value="1.1.1.1,8.8.8.8"
```
## Select and import images

Enable Ubuntu 24.04 ("noble") images for amd64, then import them.</p>

```
maas admin boot-source-selections create 1 os="ubuntu" release="noble" arches="amd64" subarches="*" labels="*"
maas admin boot-resources import
```

**CC BY-NC 2025 stormrider**
