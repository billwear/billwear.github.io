# MAAS via the CLI

[Install](maas-cli-1.md)

[Configure](maas-cli-2.md)

[DHCP](maas-cli-3.md)

[Commission](maas-cli-4.md)

[Deploy](maas-cli-5.md)

[jq](maas-cli-6.md)

[SSH](maas-cli-7.md)

[More jq](maas-cli-8.md)

------------------------------------------------------------------------

*Deploying machines with the MAAS CLI*

## Step 1: Acquiring a machine using the CLI

When it\'s finished commissioning, I can acquire a machine like this:

``` bash
stormrider@wintermute:~$ maas admin machines allocate system_id=bhxws3

Success.
Machine-readable output follows:
{
    "raids": [],
    "zone": {
    "name": "default",
    "description": "",
    "id": 1,
    "resource_uri": "/MAAS/api/2.0/zones/default/"
    },
    "current_commissioning_result_id": 8,
    "storage_test_status": 2,
    "current_testing_result_id": 9,
    "bcaches": [],
    "ip_addresses": [
    "192.168.123.190"
    ],
    "pool": {
    "name": "default",
    "description": "Default pool",
    "id": 0,
    "resource_uri": "/MAAS/api/2.0/resourcepool/0/"
    },
    "physicalblockdevice_set": [
    {
        "firmware_version": "2.5+",
        "id_path": "/dev/disk/by-id/ata-QEMU_HARDDISK_QM00001",
        "system_id": "bhxws3",
        "partition_table_type": "GPT",
        "type": "physical",
        "block_size": 512,
        "id": 3,
        "numa_node": 0,
        "partitions": [
        {
            "uuid": "8aa1164c-8a91-41d7-92e3-c411634355bb",
            "size": 5360320512,
            "bootable": false,
            "tags": [],
            "id": 3,
            "used_for": "ext4 formatted filesystem mounted at /",
            "device_id": 3,
            "system_id": "bhxws3",
            "path": "/dev/disk/by-dname/sda-part2",
            "type": "partition",
            "filesystem": {
            "fstype": "ext4",
            "label": "root",
            "uuid": "68487852-7e38-4605-a84e-d787532fd443",
            "mount_point": "/",
            "mount_options": null
            },
            "resource_uri": "/MAAS/api/2.0/nodes/bhxws3/blockdevices/3/partition/3"
        }
        ],
        "filesystem": null,
        "available_size": 0,
        "size": 5368709120,
        "storage_pool": null,
        "model": "QEMU HARDDISK",
        "used_size": 5366611968,
        "tags": [
        "ssd"
        ],
        "used_for": "GPT partitioned with 1 partition",
        "uuid": null,
        "name": "sda",
        "path": "/dev/disk/by-dname/sda",
        "serial": "QM00001",
        "resource_uri": "/MAAS/api/2.0/nodes/bhxws3/blockdevices/3/"
    }
    ],
    "swap_size": null,
    "storage": 5368.70912,
    "node_type_name": "Machine",
    "system_id": "bhxws3",
    "owner_data": {},
    "special_filesystems": [],
    "tag_names": [
    "virtual"
    ],
    "cpu_test_status_name": "Unknown",
    "locked": false,
    "cpu_count": 1,
    "volume_groups": [],
    "storage_test_status_name": "Passed",
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
    "node_type": 0,
    "other_test_status": -1,
    "hostname": "ace-swan",
    "interface_test_status": -1,
    "boot_interface": {
    "link_speed": 0,
    "params": "",
    "vendor": "Red Hat, Inc.",
    "firmware_version": null,
    "system_id": "bhxws3",
    "enabled": true,
    "type": "physical",
    "links": [
        {
        "id": 15,
        "mode": "auto",
        "subnet": {
            "name": "192.168.123.0/24",
            "description": "",
            "vlan": {
            "vid": 0,
            "mtu": 1500,
            "dhcp_on": true,
            "external_dhcp": null,
            "relay_vlan": null,
            "fabric": "fabric-2",
            "id": 5003,
            "secondary_rack": null,
            "primary_rack": "8dwnne",
            "name": "untagged",
            "fabric_id": 2,
            "space": "undefined",
            "resource_uri": "/MAAS/api/2.0/vlans/5003/"
            },
            "cidr": "192.168.123.0/24",
            "rdns_mode": 2,
            "gateway_ip": null,
            "dns_servers": [],
            "allow_dns": true,
            "allow_proxy": true,
            "active_discovery": false,
            "managed": true,
            "id": 4,
            "space": "undefined",
            "resource_uri": "/MAAS/api/2.0/subnets/4/"
        }
        }
    ],
    "id": 10,
    "discovered": [
        {
        "subnet": {
            "name": "192.168.123.0/24",
            "description": "",
            "vlan": {
            "vid": 0,
            "mtu": 1500,
            "dhcp_on": true,
            "external_dhcp": null,
            "relay_vlan": null,
            "fabric": "fabric-2",
            "id": 5003,
            "secondary_rack": null,
            "primary_rack": "8dwnne",
            "name": "untagged",
            "fabric_id": 2,
            "space": "undefined",
            "resource_uri": "/MAAS/api/2.0/vlans/5003/"
            },
            "cidr": "192.168.123.0/24",
            "rdns_mode": 2,
            "gateway_ip": null,
            "dns_servers": [],
            "allow_dns": true,
            "allow_proxy": true,
            "active_discovery": false,
            "managed": true,
            "id": 4,
            "space": "undefined",
            "resource_uri": "/MAAS/api/2.0/subnets/4/"
        },
        "ip_address": "192.168.123.190"
        }
    ],
    "numa_node": 0,
    "children": [],
    "parents": [],
    "link_connected": true,
    "effective_mtu": 1500,
    "tags": [],
    "sriov_max_vf": 0,
    "interface_speed": 0,
    "name": "ens3",
    "mac_address": "52:54:00:15:36:f2",
    "product": null,
    "vlan": {
        "vid": 0,
        "mtu": 1500,
        "dhcp_on": true,
        "external_dhcp": null,
        "relay_vlan": null,
        "fabric": "fabric-2",
        "id": 5003,
        "secondary_rack": null,
        "primary_rack": "8dwnne",
        "name": "untagged",
        "fabric_id": 2,
        "space": "undefined",
        "resource_uri": "/MAAS/api/2.0/vlans/5003/"
    },
    "resource_uri": "/MAAS/api/2.0/nodes/bhxws3/interfaces/10/"
    },
    "memory": 1024,
    "memory_test_status_name": "Unknown",
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
    "blockdevice_set": [
    {
        "id_path": "/dev/disk/by-id/ata-QEMU_HARDDISK_QM00001",
        "size": 5368709120,
        "block_size": 512,
        "tags": [
        "ssd"
        ],
        "system_id": "bhxws3",
        "partition_table_type": "GPT",
        "type": "physical",
        "id": 3,
        "numa_node": 0,
        "partitions": [
        {
            "uuid": "8aa1164c-8a91-41d7-92e3-c411634355bb",
            "size": 5360320512,
            "bootable": false,
            "tags": [],
            "id": 3,
            "used_for": "ext4 formatted filesystem mounted at /",
            "device_id": 3,
            "system_id": "bhxws3",
            "path": "/dev/disk/by-dname/sda-part2",
            "type": "partition",
            "filesystem": {
            "fstype": "ext4",
            "label": "root",
            "uuid": "68487852-7e38-4605-a84e-d787532fd443",
            "mount_point": "/",
            "mount_options": null
            },
            "resource_uri": "/MAAS/api/2.0/nodes/bhxws3/blockdevices/3/partition/3"
        }
        ],
        "filesystem": null,
        "available_size": 0,
        "storage_pool": null,
        "model": "QEMU HARDDISK",
        "used_size": 5366611968,
        "used_for": "GPT partitioned with 1 partition",
        "uuid": null,
        "name": "sda",
        "path": "/dev/disk/by-dname/sda",
        "serial": "QM00001",
        "resource_uri": "/MAAS/api/2.0/nodes/bhxws3/blockdevices/3/"
    }
    ],
    "interface_set": [
    {
        "link_speed": 0,
        "params": "",
        "vendor": "Red Hat, Inc.",
        "firmware_version": null,
        "system_id": "bhxws3",
        "enabled": true,
        "type": "physical",
        "links": [
        {
            "id": 15,
            "mode": "auto",
            "subnet": {
            "name": "192.168.123.0/24",
            "description": "",
            "vlan": {
                "vid": 0,
                "mtu": 1500,
                "dhcp_on": true,
                "external_dhcp": null,
                "relay_vlan": null,
                "fabric": "fabric-2",
                "id": 5003,
                "secondary_rack": null,
                "primary_rack": "8dwnne",
                "name": "untagged",
                "fabric_id": 2,
                "space": "undefined",
                "resource_uri": "/MAAS/api/2.0/vlans/5003/"
            },
            "cidr": "192.168.123.0/24",
            "rdns_mode": 2,
            "gateway_ip": null,
            "dns_servers": [],
            "allow_dns": true,
            "allow_proxy": true,
            "active_discovery": false,
            "managed": true,
            "id": 4,
            "space": "undefined",
            "resource_uri": "/MAAS/api/2.0/subnets/4/"
            }
        }
        ],
        "id": 10,
        "discovered": [
        {
            "subnet": {
            "name": "192.168.123.0/24",
            "description": "",
            "vlan": {
                "vid": 0,
                "mtu": 1500,
                "dhcp_on": true,
                "external_dhcp": null,
                "relay_vlan": null,
                "fabric": "fabric-2",
                "id": 5003,
                "secondary_rack": null,
                "primary_rack": "8dwnne",
                "name": "untagged",
                "fabric_id": 2,
                "space": "undefined",
                "resource_uri": "/MAAS/api/2.0/vlans/5003/"
            },
            "cidr": "192.168.123.0/24",
            "rdns_mode": 2,
            "gateway_ip": null,
            "dns_servers": [],
            "allow_dns": true,
            "allow_proxy": true,
            "active_discovery": false,
            "managed": true,
            "id": 4,
            "space": "undefined",
            "resource_uri": "/MAAS/api/2.0/subnets/4/"
            },
            "ip_address": "192.168.123.190"
        }
        ],
        "numa_node": 0,
        "children": [],
        "parents": [],
        "link_connected": true,
        "effective_mtu": 1500,
        "tags": [],
        "sriov_max_vf": 0,
        "interface_speed": 0,
        "name": "ens3",
        "mac_address": "52:54:00:15:36:f2",
        "product": null,
        "vlan": {
        "vid": 0,
        "mtu": 1500,
        "dhcp_on": true,
        "external_dhcp": null,
        "relay_vlan": null,
        "fabric": "fabric-2",
        "id": 5003,
        "secondary_rack": null,
        "primary_rack": "8dwnne",
        "name": "untagged",
        "fabric_id": 2,
        "space": "undefined",
        "resource_uri": "/MAAS/api/2.0/vlans/5003/"
        },
        "resource_uri": "/MAAS/api/2.0/nodes/bhxws3/interfaces/10/"
    }
    ],
    "numanode_set": [
    {
        "index": 0,
        "memory": 985,
        "cores": [
        0
        ]
    }
    ],
    "min_hwe_kernel": "",
    "memory_test_status": -1,
    "power_type": "virsh",
    "power_state": "off",
    "status": 10,
    "testing_status_name": "Passed",
    "interface_test_status_name": "Unknown",
    "cache_sets": [],
    "constraints_by_type": {},
    "domain": {
    "authoritative": true,
    "ttl": null,
    "id": 0,
    "resource_record_count": 0,
    "name": "maas",
    "is_default": true,
    "resource_uri": "/MAAS/api/2.0/domains/0/"
    },
    "network_test_status": -1,
    "current_installation_result_id": null,
    "bios_boot_method": "pxe",
    "status_name": "Allocated",
    "address_ttl": null,
    "fqdn": "ace-swan.maas",
    "cpu_speed": 0,
    "hwe_kernel": null,
    "description": "",
    "commissioning_status_name": "Passed",
    "pod": null,
    "network_test_status_name": "Unknown",
    "hardware_uuid": "F677A842-571C-4E65-ADC9-11E2CF92D363",
    "commissioning_status": 2,
    "status_message": "Ready",
    "owner": "admin",
    "distro_series": "",
    "status_action": "",
    "testing_status": 2,
    "cpu_test_status": -1,
    "architecture": "amd64/generic",
    "netboot": true,
    "iscsiblockdevice_set": [],
    "disable_ipv4": false,
    "virtualblockdevice_set": [],
    "osystem": "",
    "boot_disk": {
    "firmware_version": "2.5+",
    "id_path": "/dev/disk/by-id/ata-QEMU_HARDDISK_QM00001",
    "system_id": "bhxws3",
    "partition_table_type": "GPT",
    "type": "physical",
    "block_size": 512,
    "id": 3,
    "numa_node": 0,
    "partitions": [
        {
        "uuid": "8aa1164c-8a91-41d7-92e3-c411634355bb",
        "size": 5360320512,
        "bootable": false,
        "tags": [],
        "id": 3,
        "used_for": "ext4 formatted filesystem mounted at /",
        "device_id": 3,
        "system_id": "bhxws3",
        "path": "/dev/disk/by-dname/sda-part2",
        "type": "partition",
        "filesystem": {
            "fstype": "ext4",
            "label": "root",
            "uuid": "68487852-7e38-4605-a84e-d787532fd443",
            "mount_point": "/",
            "mount_options": null
        },
        "resource_uri": "/MAAS/api/2.0/nodes/bhxws3/blockdevices/3/partition/3"
        }
    ],
    "filesystem": null,
    "available_size": 0,
    "size": 5368709120,
    "storage_pool": null,
    "model": "QEMU HARDDISK",
    "used_size": 5366611968,
    "tags": [
        "ssd"
    ],
    "used_for": "GPT partitioned with 1 partition",
    "uuid": null,
    "name": "sda",
    "path": "/dev/disk/by-dname/sda",
    "serial": "QM00001",
    "resource_uri": "/MAAS/api/2.0/nodes/bhxws3/blockdevices/3/"
    },
    "other_test_status_name": "Unknown",
    "resource_uri": "/MAAS/api/2.0/machines/bhxws3/"
}
```

## Deploying a machine with the CLI

Having once acquired the machine, which basically gives my username
control, I can deploy the machine this way:

``` bash
stormrider@wintermute:~$  maas admin machine deploy bhxws3 

Success.
Machine-readable output follows:
{
    "architecture": "amd64/generic",
    "cpu_speed": 0,
    "tag_names": [
    "virtual"
    ],
    "boot_interface": {
    "mac_address": "52:54:00:15:36:f2",
    "links": [
        {
        "id": 15,
        "mode": "auto",
        "subnet": {
            "name": "192.168.123.0/24",
            "description": "",
            "vlan": {
            "vid": 0,
            "mtu": 1500,
            "dhcp_on": true,
            "external_dhcp": null,
            "relay_vlan": null,
            "fabric_id": 2,
            "id": 5003,
            "fabric": "fabric-2",
            "secondary_rack": null,
            "name": "untagged",
            "space": "undefined",
            "primary_rack": "8dwnne",
            "resource_uri": "/MAAS/api/2.0/vlans/5003/"
            },
            "cidr": "192.168.123.0/24",
            "rdns_mode": 2,
            "gateway_ip": null,
            "dns_servers": [],
            "allow_dns": true,
            "allow_proxy": true,
            "active_discovery": false,
            "managed": true,
            "id": 4,
            "space": "undefined",
            "resource_uri": "/MAAS/api/2.0/subnets/4/"
        }
        }
    ],
    "numa_node": 0,
    "enabled": true,
    "params": "",
    "firmware_version": null,
    "sriov_max_vf": 0,
    "type": "physical",
    "children": [],
    "vendor": "Red Hat, Inc.",
    "system_id": "bhxws3",
    "parents": [],
    "vlan": {
        "vid": 0,
        "mtu": 1500,
        "dhcp_on": true,
        "external_dhcp": null,
        "relay_vlan": null,
        "fabric_id": 2,
        "id": 5003,
        "fabric": "fabric-2",
        "secondary_rack": null,
        "name": "untagged",
        "space": "undefined",
        "primary_rack": "8dwnne",
        "resource_uri": "/MAAS/api/2.0/vlans/5003/"
    },
    "link_connected": true,
    "id": 10,
    "effective_mtu": 1500,
    "discovered": [
        {
        "subnet": {
            "name": "192.168.123.0/24",
            "description": "",
            "vlan": {
            "vid": 0,
            "mtu": 1500,
            "dhcp_on": true,
            "external_dhcp": null,
            "relay_vlan": null,
            "fabric_id": 2,
            "id": 5003,
            "fabric": "fabric-2",
            "secondary_rack": null,
            "name": "untagged",
            "space": "undefined",
            "primary_rack": "8dwnne",
            "resource_uri": "/MAAS/api/2.0/vlans/5003/"
            },
            "cidr": "192.168.123.0/24",
            "rdns_mode": 2,
            "gateway_ip": null,
            "dns_servers": [],
            "allow_dns": true,
            "allow_proxy": true,
            "active_discovery": false,
            "managed": true,
            "id": 4,
            "space": "undefined",
            "resource_uri": "/MAAS/api/2.0/subnets/4/"
        },
        "ip_address": "192.168.123.190"
        }
    ],
    "link_speed": 0,
    "name": "ens3",
    "product": null,
    "interface_speed": 0,
    "tags": [],
    "resource_uri": "/MAAS/api/2.0/nodes/bhxws3/interfaces/10/"
    },
    "ip_addresses": [
    "192.168.123.190"
    ],
    "testing_status_name": "Passed",
    "osystem": "ubuntu",
    "bcaches": [],
    "owner": "admin",
    "special_filesystems": [],
    "numanode_set": [
    {
        "index": 0,
        "memory": 985,
        "cores": [
        0
        ]
    }
    ],
    "node_type": 0,
    "cpu_test_status": -1,
    "storage_test_status_name": "Passed",
    "locked": false,
    "disable_ipv4": false,
    "status_message": "Deploying",
    "other_test_status_name": "Unknown",
    "interface_test_status_name": "Unknown",
    "status_name": "Deploying",
    "commissioning_status": 2,
    "hardware_uuid": "F677A842-571C-4E65-ADC9-11E2CF92D363",
    "fqdn": "ace-swan.maas",
    "min_hwe_kernel": "",
    "network_test_status": -1,
    "iscsiblockdevice_set": [],
    "current_testing_result_id": 9,
    "interface_test_status": -1,
    "status_action": "",
    "pool": {
    "name": "default",
    "description": "Default pool",
    "id": 0,
    "resource_uri": "/MAAS/api/2.0/resourcepool/0/"
    },
    "netboot": true,
    "distro_series": "bionic",
    "current_installation_result_id": 10,
    "memory_test_status_name": "Unknown",
    "cpu_count": 1,
    "hwe_kernel": "ga-18.04",
    "description": "",
    "current_commissioning_result_id": 8,
    "cpu_test_status_name": "Unknown",
    "storage_test_status": 2,
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
    "bios_boot_method": "pxe",
    "storage": 5368.70912,
    "blockdevice_set": [
    {
        "id_path": "/dev/disk/by-id/ata-QEMU_HARDDISK_QM00001",
        "size": 5368709120,
        "block_size": 512,
        "tags": [
        "ssd"
        ],
        "numa_node": 0,
        "partition_table_type": "GPT",
        "storage_pool": null,
        "type": "physical",
        "filesystem": null,
        "model": "QEMU HARDDISK",
        "used_size": 5366611968,
        "serial": "QM00001",
        "system_id": "bhxws3",
        "uuid": null,
        "available_size": 0,
        "path": "/dev/disk/by-dname/sda",
        "id": 3,
        "name": "sda",
        "partitions": [
        {
            "uuid": "8aa1164c-8a91-41d7-92e3-c411634355bb",
            "size": 5360320512,
            "bootable": false,
            "tags": [],
            "path": "/dev/disk/by-dname/sda-part2",
            "device_id": 3,
            "type": "partition",
            "id": 3,
            "system_id": "bhxws3",
            "filesystem": {
            "fstype": "ext4",
            "label": "root",
            "uuid": "68487852-7e38-4605-a84e-d787532fd443",
            "mount_point": "/",
            "mount_options": null
            },
            "used_for": "ext4 formatted filesystem mounted at /",
            "resource_uri": "/MAAS/api/2.0/nodes/bhxws3/blockdevices/3/partition/3"
        }
        ],
        "used_for": "GPT partitioned with 1 partition",
        "resource_uri": "/MAAS/api/2.0/nodes/bhxws3/blockdevices/3/"
    }
    ],
    "system_id": "bhxws3",
    "boot_disk": {
    "firmware_version": "2.5+",
    "tags": [
        "ssd"
    ],
    "numa_node": 0,
    "partition_table_type": "GPT",
    "size": 5368709120,
    "storage_pool": null,
    "type": "physical",
    "block_size": 512,
    "filesystem": null,
    "model": "QEMU HARDDISK",
    "used_size": 5366611968,
    "serial": "QM00001",
    "system_id": "bhxws3",
    "uuid": null,
    "available_size": 0,
    "path": "/dev/disk/by-dname/sda",
    "id": 3,
    "id_path": "/dev/disk/by-id/ata-QEMU_HARDDISK_QM00001",
    "name": "sda",
    "partitions": [
        {
        "uuid": "8aa1164c-8a91-41d7-92e3-c411634355bb",
        "size": 5360320512,
        "bootable": false,
        "tags": [],
        "path": "/dev/disk/by-dname/sda-part2",
        "device_id": 3,
        "type": "partition",
        "id": 3,
        "system_id": "bhxws3",
        "filesystem": {
            "fstype": "ext4",
            "label": "root",
            "uuid": "68487852-7e38-4605-a84e-d787532fd443",
            "mount_point": "/",
            "mount_options": null
        },
        "used_for": "ext4 formatted filesystem mounted at /",
        "resource_uri": "/MAAS/api/2.0/nodes/bhxws3/blockdevices/3/partition/3"
        }
    ],
    "used_for": "GPT partitioned with 1 partition",
    "resource_uri": "/MAAS/api/2.0/nodes/bhxws3/blockdevices/3/"
    },
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
    "raids": [],
    "cache_sets": [],
    "domain": {
    "authoritative": true,
    "ttl": null,
    "is_default": true,
    "id": 0,
    "name": "maas",
    "resource_record_count": 0,
    "resource_uri": "/MAAS/api/2.0/domains/0/"
    },
    "hostname": "ace-swan",
    "virtualblockdevice_set": [],
    "memory": 1024,
    "owner_data": {},
    "zone": {
    "name": "default",
    "description": "",
    "id": 1,
    "resource_uri": "/MAAS/api/2.0/zones/default/"
    },
    "power_state": "off",
    "status": 9,
    "address_ttl": null,
    "other_test_status": -1,
    "volume_groups": [],
    "power_type": "virsh",
    "pod": null,
    "testing_status": 2,
    "physicalblockdevice_set": [
    {
        "firmware_version": "2.5+",
        "tags": [
        "ssd"
        ],
        "numa_node": 0,
        "partition_table_type": "GPT",
        "size": 5368709120,
        "storage_pool": null,
        "type": "physical",
        "block_size": 512,
        "filesystem": null,
        "model": "QEMU HARDDISK",
        "used_size": 5366611968,
        "serial": "QM00001",
        "system_id": "bhxws3",
        "uuid": null,
        "available_size": 0,
        "path": "/dev/disk/by-dname/sda",
        "id": 3,
        "id_path": "/dev/disk/by-id/ata-QEMU_HARDDISK_QM00001",
        "name": "sda",
        "partitions": [
        {
            "uuid": "8aa1164c-8a91-41d7-92e3-c411634355bb",
            "size": 5360320512,
            "bootable": false,
            "tags": [],
            "path": "/dev/disk/by-dname/sda-part2",
            "device_id": 3,
            "type": "partition",
            "id": 3,
            "system_id": "bhxws3",
            "filesystem": {
            "fstype": "ext4",
            "label": "root",
            "uuid": "68487852-7e38-4605-a84e-d787532fd443",
            "mount_point": "/",
            "mount_options": null
            },
            "used_for": "ext4 formatted filesystem mounted at /",
            "resource_uri": "/MAAS/api/2.0/nodes/bhxws3/blockdevices/3/partition/3"
        }
        ],
        "used_for": "GPT partitioned with 1 partition",
        "resource_uri": "/MAAS/api/2.0/nodes/bhxws3/blockdevices/3/"
    }
    ],
    "interface_set": [
    {
        "mac_address": "52:54:00:15:36:f2",
        "links": [
        {
            "id": 15,
            "mode": "auto",
            "subnet": {
            "name": "192.168.123.0/24",
            "description": "",
            "vlan": {
                "vid": 0,
                "mtu": 1500,
                "dhcp_on": true,
                "external_dhcp": null,
                "relay_vlan": null,
                "fabric_id": 2,
                "id": 5003,
                "fabric": "fabric-2",
                "secondary_rack": null,
                "name": "untagged",
                "space": "undefined",
                "primary_rack": "8dwnne",
                "resource_uri": "/MAAS/api/2.0/vlans/5003/"
            },
            "cidr": "192.168.123.0/24",
            "rdns_mode": 2,
            "gateway_ip": null,
            "dns_servers": [],
            "allow_dns": true,
            "allow_proxy": true,
            "active_discovery": false,
            "managed": true,
            "id": 4,
            "space": "undefined",
            "resource_uri": "/MAAS/api/2.0/subnets/4/"
            }
        }
        ],
        "numa_node": 0,
        "enabled": true,
        "params": "",
        "firmware_version": null,
        "sriov_max_vf": 0,
        "type": "physical",
        "children": [],
        "vendor": "Red Hat, Inc.",
        "system_id": "bhxws3",
        "parents": [],
        "vlan": {
        "vid": 0,
        "mtu": 1500,
        "dhcp_on": true,
        "external_dhcp": null,
        "relay_vlan": null,
        "fabric_id": 2,
        "id": 5003,
        "fabric": "fabric-2",
        "secondary_rack": null,
        "name": "untagged",
        "space": "undefined",
        "primary_rack": "8dwnne",
        "resource_uri": "/MAAS/api/2.0/vlans/5003/"
        },
        "link_connected": true,
        "id": 10,
        "effective_mtu": 1500,
        "discovered": [
        {
            "subnet": {
            "name": "192.168.123.0/24",
            "description": "",
            "vlan": {
                "vid": 0,
                "mtu": 1500,
                "dhcp_on": true,
                "external_dhcp": null,
                "relay_vlan": null,
                "fabric_id": 2,
                "id": 5003,
                "fabric": "fabric-2",
                "secondary_rack": null,
                "name": "untagged",
                "space": "undefined",
                "primary_rack": "8dwnne",
                "resource_uri": "/MAAS/api/2.0/vlans/5003/"
            },
            "cidr": "192.168.123.0/24",
            "rdns_mode": 2,
            "gateway_ip": null,
            "dns_servers": [],
            "allow_dns": true,
            "allow_proxy": true,
            "active_discovery": false,
            "managed": true,
            "id": 4,
            "space": "undefined",
            "resource_uri": "/MAAS/api/2.0/subnets/4/"
            },
            "ip_address": "192.168.123.190"
        }
        ],
        "link_speed": 0,
        "name": "ens3",
        "product": null,
        "interface_speed": 0,
        "tags": [],
        "resource_uri": "/MAAS/api/2.0/nodes/bhxws3/interfaces/10/"
    }
    ],
    "node_type_name": "Machine",
    "commissioning_status_name": "Passed",
    "network_test_status_name": "Unknown",
    "memory_test_status": -1,
    "swap_size": null,
    "resource_uri": "/MAAS/api/2.0/machines/bhxws3/"
}
```

Okay, done with that much. I have installed and configured MAAS, started
DHCP, created a machine, commissioned it, acquired it, and deployed it
without touching the UI. Next, I\'m going to get a large number of
machines online -- both LXD VMs and libvirt VMs -- and see if I can do a
little jq magic to get some more human-readable output from the MAAS
CLI.
