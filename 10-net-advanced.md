# 10 · Advanced Networking

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
    
## Inspect interfaces

```
maas admin interfaces read <SYSID> | jq -r '.[] | [.id, .name, .type, .mac_address, .vlan.fabric, .vlan.name] | @tsv' | column -t
```

## Create a bridge

```
maas admin interfaces create-bridge <SYSID> name=br0 parent=3
```

## Create a bond

```
maas admin interfaces create-bond <SYSID> name=bond0 bond_mode=802.3ad parents=3,4
```

## Add a VLAN subinterface

```
# make VLAN 42 on fabric 2
maas admin vlans create 2 vid=42 name=prod42
# attach it to the system on top of bridge id 10
maas admin interfaces create-vlan <SYSID> vlan=<VLAN_ID> parent=10
```

## Link a subnet

```
# static
maas admin interfaces link-subnet <SYSID> <IFACEID> mode=STATIC subnet=<SUBNET_ID> ip_address=192.168.42.20
# or DHCP
maas admin interfaces link-subnet <SYSID> <IFACEID> mode=DHCP subnet=<SUBNET_ID>
```

**CC BY-NC 2025 stormrider**
