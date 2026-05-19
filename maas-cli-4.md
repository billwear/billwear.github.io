```{=org}
#+DUNSEL: this just touches the file: flip
```

------------------------------------------------------------------------

MAAS: [Install](https://stormrider.io/maas-cli-1.html) \~
[Configure](https://stormrider.io/maas-cli-2.html) \~
[DHCP](https://stormrider.io/maas-cli-3.html) \~
[Commission](https://stormrider.io/maas-cli-4.html) \~
[Deploy](https://stormrider.io/maas-cli-5.html) \~
[jq](https://stormrider.io/maas-cli-6.html) \~
[SSH](https://stormrider.io/maas-cli-7.html) \~ [More
jq](https://stormrider.io/maas-cli-8.html)

------------------------------------------------------------------------

*Commissioning machines with the MAAS CLI*

In order to deploy machines, I\'ve got to create some, plain and simple,
and then commission them. Normally, I\'d do that with the UI, but for
this exercise, I\'m going to attempt it with the CLI.

``` bash
stormrider@wintermute:~$  maas admin machines create
  &gt; architecture=amd64
  &gt; mac_addresses=52:54:00:15:36:f2
  &gt; power_type=virsh
  &gt; power_parameters_power_id=f677a842-571c-4e65-adc9-11e2cf92d363
  &gt; power_parameters_power_address=qemu+ssh://stormrider@192.168.123.1/system
  &gt; power_parameters_power_pass=xxxxxxxx

Success.
Machine-readable output follows:
{
    "storage": 0.0,
    "tag_names": [],
    "special_filesystems": [],
    "memory": 0,
    "boot_disk": null,
    "virtualblockdevice_set": [],
    "hardware_info": {
    "system_vendor": "Unknown",
    "system_product": "Unknown",
    "system_family": "Unknown",
    "system_version": "Unknown",
    "system_sku": "Unknown",
    "system_serial": "Unknown",
    "cpu_model": "Unknown",
    "mainboard_vendor": "Unknown",
    "mainboard_product": "Unknown",
    "mainboard_serial": "Unknown",
    "mainboard_version": "Unknown",
    "mainboard_firmware_vendor": "Unknown",
    "mainboard_firmware_date": "Unknown",
    "mainboard_firmware_version": "Unknown",
    "chassis_vendor": "Unknown",
    "chassis_type": "Unknown",
    "chassis_serial": "Unknown",
    "chassis_version": "Unknown"
    },
    "address_ttl": null,
    "memory_test_status": -1,
    "other_test_status_name": "Unknown",
    "osystem": "",
    "status_message": "Commissioning",
    "netboot": true,
    "physicalblockdevice_set": [],
    "node_type": 0,
    "cpu_test_status": -1,
    "memory_test_status_name": "Unknown",
    "bcaches": [],
    "storage_test_status": 0,
    "system_id": "bhxws3",
    "status": 1,
    "commissioning_status": 0,
    "power_type": "virsh",
    "locked": false,
    "numanode_set": [
    {
        "index": 0,
        "memory": 0,
        "cores": []
    }
    ],
    "bios_boot_method": null,
    "fqdn": "ace-swan.maas",
    "node_type_name": "Machine",
    "hostname": "ace-swan",
    "volume_groups": [],
    "testing_status": 0,
    "network_test_status": -1,
    "other_test_status": -1,
    "interface_test_status": -1,
    "hwe_kernel": null,
    "blockdevice_set": [],
    "testing_status_name": "Pending",
    "power_state": "unknown",
    "min_hwe_kernel": "",
    "owner": "admin",
    "distro_series": "",
    "storage_test_status_name": "Pending",
    "cpu_speed": 0,
    "swap_size": null,
    "cpu_test_status_name": "Unknown",
    "hardware_uuid": null,
    "architecture": "amd64/generic",
    "pool": {
    "name": "default",
    "description": "Default pool",
    "id": 0,
    "resource_uri": "/MAAS/api/2.0/resourcepool/0/"
    },
    "cache_sets": [],
    "pod": null,
    "iscsiblockdevice_set": [],
    "disable_ipv4": false,
    "status_action": "",
    "boot_interface": {
    "name": "eth0",
    "id": 10,
    "product": null,
    "system_id": "bhxws3",
    "effective_mtu": 1500,
    "children": [],
    "link_connected": true,
    "enabled": true,
    "interface_speed": 0,
    "numa_node": 0,
    "firmware_version": null,
    "parents": [],
    "discovered": null,
    "params": "",
    "links": [],
    "sriov_max_vf": 0,
    "tags": [],
    "type": "physical",
    "vlan": null,
    "vendor": null,
    "link_speed": 0,
    "mac_address": "52:54:00:15:36:f2",
    "resource_uri": "/MAAS/api/2.0/nodes/bhxws3/interfaces/10/"
    },
    "cpu_count": 0,
    "domain": {
    "authoritative": true,
    "ttl": null,
    "resource_record_count": 0,
    "name": "maas",
    "is_default": true,
    "id": 0,
    "resource_uri": "/MAAS/api/2.0/domains/0/"
    },
    "current_testing_result_id": 7,
    "default_gateways": {
    "ipv4": {
        "gateway_ip": null,
        "link_id": null
    },
    "ipv6": {
        "gateway_ip": null,
        "link_id": null
    }
    },
    "interface_set": [
    {
        "name": "eth0",
        "id": 10,
        "product": null,
        "system_id": "bhxws3",
        "effective_mtu": 1500,
        "children": [],
        "link_connected": true,
        "enabled": true,
        "interface_speed": 0,
        "numa_node": 0,
        "firmware_version": null,
        "parents": [],
        "discovered": null,
        "params": "",
        "links": [],
        "sriov_max_vf": 0,
        "tags": [],
        "type": "physical",
        "vlan": null,
        "vendor": null,
        "link_speed": 0,
        "mac_address": "52:54:00:15:36:f2",
        "resource_uri": "/MAAS/api/2.0/nodes/bhxws3/interfaces/10/"
    }
    ],
    "status_name": "Commissioning",
    "commissioning_status_name": "Pending",
    "owner_data": {},
    "ip_addresses": [],
    "raids": [],
    "network_test_status_name": "Unknown",
    "description": "",
    "current_commissioning_result_id": 6,
    "interface_test_status_name": "Unknown",
    "current_installation_result_id": null,
    "zone": {
    "name": "default",
    "description": "",
    "id": 1,
    "resource_uri": "/MAAS/api/2.0/zones/default/"
    },
    "resource_uri": "/MAAS/api/2.0/machines/bhxws3/"
}
```

And just like that, it\'s already commissioning, just as if I\'d created
it from the UI. A lot of parameters there are a little hard to discover:
They may be somewhere in the documentation, or perhaps they\'re buried
in one of the \"read\" outputs. I used the help and a couple of other
commands to discover the \"powerpass\" parameter, for example, though I
later found it somewhere else in the documentation. Doc is always a work
in progress, I guess.\
Commissioning by CLI

So now I have a machine in the \"Ready\" state, but I\'d like to get
familiar with commanding MAAS to commission it via the CLI. All I really
need for that is the system ID, which is the last parameter in the
\"resourceuri\" above. But just for grins, let\'s go ahead and retrieve
the system ID using the CLI. There\'s only one, so I don\'t have to
worry about any other cross-referencing on this machine:

``` bash
stormrider@wintermute:~$  maas admin machines read | jq '.[] | .hostname, .system_id' 
"ace-swan"
"bhxws3"
```

Okay, now I can use that system ID to commission the machine via the
CLI:

``` bash
stormrider@wintermute:~$  maas admin machine commission bhxws3 

Success.
Machine-readable output follows:
{
    "storage_test_status_name": "Pending",
    "bcaches": [],
    "cpu_count": 1,
    "interface_set": [
    {
        "params": "",
        "numa_node": 0,
        "tags": [],
        "id": 10,
        "mac_address": "52:54:00:15:36:f2",
        "vendor": "Red Hat, Inc.",
        "children": [],
        "effective_mtu": 1500,
        "discovered": [],
        "links": [],
        "link_speed": 0,
        "link_connected": true,
        "system_id": "bhxws3",
        "enabled": true,
        "interface_speed": 0,
        "firmware_version": null,
        "name": "ens3",
        "sriov_max_vf": 0,
        "product": null,
        "vlan": {
        "vid": 0,
        "mtu": 1500,
        "dhcp_on": true,
        "external_dhcp": null,
        "relay_vlan": null,
        "fabric": "fabric-2",
        "primary_rack": "8dwnne",
        "name": "untagged",
        "id": 5003,
        "space": "undefined",
        "secondary_rack": null,
        "fabric_id": 2,
        "resource_uri": "/MAAS/api/2.0/vlans/5003/"
        },
        "parents": [],
        "type": "physical",
        "resource_uri": "/MAAS/api/2.0/nodes/bhxws3/interfaces/10/"
    }
    ],
    "network_test_status_name": "Unknown",
    "numanode_set": [
    {
        "index": 0,
        "memory": 985,
        "cores": [
        0
        ]
    }
    ],
    "locked": false,
    "hardware_uuid": "F677A842-571C-4E65-ADC9-11E2CF92D363",
    "default_gateways": {
    "ipv4": {
        "gateway_ip": null,
        "link_id": null
    },
    "ipv6": {
        "gateway_ip": null,
        "link_id": null
    }
    },
    "status_action": "",
    "status_message": "Commissioning",
    "cpu_test_status_name": "Unknown",
    "memory_test_status": -1,
    "virtualblockdevice_set": [],
    "pool": {
    "name": "default",
    "description": "Default pool",
    "id": 0,
    "resource_uri": "/MAAS/api/2.0/resourcepool/0/"
    },
    "current_testing_result_id": 9,
    "current_installation_result_id": null,
    "netboot": true,
    "description": "",
    "special_filesystems": [],
    "testing_status": 0,
    "memory": 1024,
    "current_commissioning_result_id": 8,
    "storage": 5368.70912,
    "commissioning_status": 0,
    "cpu_test_status": -1,
    "tag_names": [
    "virtual"
    ],
    "memory_test_status_name": "Unknown",
    "swap_size": null,
    "status_name": "Commissioning",
    "other_test_status": -1,
    "pod": null,
    "storage_test_status": 0,
    "blockdevice_set": [
    {
        "id_path": "/dev/disk/by-id/ata-QEMU_HARDDISK_QM00001",
        "size": 5368709120,
        "block_size": 512,
        "tags": [
        "ssd"
        ],
        "serial": "QM00001",
        "uuid": null,
        "numa_node": 0,
        "available_size": 5368709120,
        "id": 3,
        "partition_table_type": null,
        "model": "QEMU HARDDISK",
        "path": "/dev/disk/by-dname/sda",
        "storage_pool": null,
        "used_for": "Unused",
        "filesystem": null,
        "system_id": "bhxws3",
        "used_size": 0,
        "partitions": [],
        "name": "sda",
        "type": "physical",
        "resource_uri": "/MAAS/api/2.0/nodes/bhxws3/blockdevices/3/"
    }
    ],
    "other_test_status_name": "Unknown",
    "distro_series": "",
    "testing_status_name": "Pending",
    "ip_addresses": [],
    "address_ttl": null,
    "system_id": "bhxws3",
    "physicalblockdevice_set": [
    {
        "firmware_version": "2.5+",
        "serial": "QM00001",
        "uuid": null,
        "numa_node": 0,
        "available_size": 5368709120,
        "size": 5368709120,
        "tags": [
        "ssd"
        ],
        "id": 3,
        "partition_table_type": null,
        "id_path": "/dev/disk/by-id/ata-QEMU_HARDDISK_QM00001",
        "model": "QEMU HARDDISK",
        "path": "/dev/disk/by-dname/sda",
        "storage_pool": null,
        "used_for": "Unused",
        "filesystem": null,
        "system_id": "bhxws3",
        "used_size": 0,
        "partitions": [],
        "name": "sda",
        "block_size": 512,
        "type": "physical",
        "resource_uri": "/MAAS/api/2.0/nodes/bhxws3/blockdevices/3/"
    }
    ],
    "fqdn": "ace-swan.maas",
    "osystem": "",
    "domain": {
    "authoritative": true,
    "ttl": null,
    "resource_record_count": 0,
    "name": "maas",
    "id": 0,
    "is_default": true,
    "resource_uri": "/MAAS/api/2.0/domains/0/"
    },
    "boot_interface": {
    "params": "",
    "numa_node": 0,
    "tags": [],
    "id": 10,
    "mac_address": "52:54:00:15:36:f2",
    "vendor": "Red Hat, Inc.",
    "children": [],
    "effective_mtu": 1500,
    "discovered": [],
    "links": [],
    "link_speed": 0,
    "link_connected": true,
    "system_id": "bhxws3",
    "enabled": true,
    "interface_speed": 0,
    "firmware_version": null,
    "name": "ens3",
    "sriov_max_vf": 0,
    "product": null,
    "vlan": {
        "vid": 0,
        "mtu": 1500,
        "dhcp_on": true,
        "external_dhcp": null,
        "relay_vlan": null,
        "fabric": "fabric-2",
        "primary_rack": "8dwnne",
        "name": "untagged",
        "id": 5003,
        "space": "undefined",
        "secondary_rack": null,
        "fabric_id": 2,
        "resource_uri": "/MAAS/api/2.0/vlans/5003/"
    },
    "parents": [],
    "type": "physical",
    "resource_uri": "/MAAS/api/2.0/nodes/bhxws3/interfaces/10/"
    },
    "hostname": "ace-swan",
    "network_test_status": -1,
    "min_hwe_kernel": "",
    "power_state": "off",
    "interface_test_status_name": "Unknown",
    "owner_data": {},
    "volume_groups": [],
    "power_type": "virsh",
    "node_type": 0,
    "owner": "admin",
    "cache_sets": [],
    "architecture": "amd64/generic",
    "hwe_kernel": null,
    "zone": {
    "name": "default",
    "description": "",
    "id": 1,
    "resource_uri": "/MAAS/api/2.0/zones/default/"
    },
    "disable_ipv4": false,
    "boot_disk": {
    "firmware_version": "2.5+",
    "serial": "QM00001",
    "uuid": null,
    "numa_node": 0,
    "available_size": 5368709120,
    "size": 5368709120,
    "tags": [
        "ssd"
    ],
    "id": 3,
    "partition_table_type": null,
    "id_path": "/dev/disk/by-id/ata-QEMU_HARDDISK_QM00001",
    "model": "QEMU HARDDISK",
    "path": "/dev/disk/by-dname/sda",
    "storage_pool": null,
    "used_for": "Unused",
    "filesystem": null,
    "system_id": "bhxws3",
    "used_size": 0,
    "partitions": [],
    "name": "sda",
    "block_size": 512,
    "type": "physical",
    "resource_uri": "/MAAS/api/2.0/nodes/bhxws3/blockdevices/3/"
    },
    "status": 1,
    "iscsiblockdevice_set": [],
    "raids": [],
    "node_type_name": "Machine",
    "hardware_info": {
    "system_vendor": "QEMU",
    "system_product": "Standard PC (i440FX + PIIX, 1996)",
    "system_family": "Unknown",
    "system_version": "pc-i440fx-focal",
    "system_sku": "Unknown",
    "system_serial": "Unknown",
    "cpu_model": "Intel Core Processor (Skylake, IBRS)",
    "mainboard_vendor": "Unknown",
    "mainboard_product": "Unknown",
    "mainboard_serial": "Unknown",
    "mainboard_version": "Unknown",
    "mainboard_firmware_vendor": "SeaBIOS",
    "mainboard_firmware_date": "04/01/2014",
    "mainboard_firmware_version": "1.13.0-1ubuntu1",
    "chassis_vendor": "QEMU",
    "chassis_type": "Other",
    "chassis_serial": "Unknown",
    "chassis_version": "pc-i440fx-focal"
    },
    "commissioning_status_name": "Pending",
    "bios_boot_method": "pxe",
    "interface_test_status": -1,
    "cpu_speed": 0,
    "resource_uri": "/MAAS/api/2.0/machines/bhxws3/"
}
```

And that\'s it, it\'s that easy. It takes a minute to get all the
parameters together to create a new machine, but it doesn\'t seem that
difficult to me. I guess now it\'s time to acquire and deploy my
commissioned machine.
