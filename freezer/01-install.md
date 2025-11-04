<style>
body {background-color: linen;}
</style>
# 01 · Install and Initialize MAAS

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
    
## Install snaps
```
sudo snap install maas --channel=stable
sudo snap install maas-cli --channel=stable
maas --version
```
## Install PostgreSQL
```
sudo apt update
sudo apt install -y postgresql
sudo -u postgres psql -c "create user maas with encrypted password 'maas'"
sudo -u postgres createdb -O maas maasdb
echo "host maasdb maas 127.0.0.1/32 md5" | sudo tee -a /etc/postgresql/*/main/pg_hba.conf
sudo systemctl restart postgresql
```
## Initialize MAAS (Region+Rack)
```
sudo maas init region+rack --database-uri "postgres://maas:maas@127.0.0.1/maasdb"
sudo maas createadmin
```

**CC BY-NC 2025 stormrider**
