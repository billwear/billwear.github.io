---
layout: page
title: "MAAS from the CLI: Configuring MAAS"
permalink: /maas-cli-2/
description: "Configuring MAAS via the CLI only — logging in, getting real help, setting DNS, importing boot images, and a first look at jq for parsing JSON output."
series: maas-cli
series_part: 2
---

*Part of a series: [Install](/maas-cli-1/) · [Configure](/maas-cli-2/) · [DHCP](/maas-cli-3/) · [Commission](/maas-cli-4/) · [Deploy](/maas-cli-5/) · [jq](/maas-cli-6/) · [SSH](/maas-cli-7/) · [More jq](/maas-cli-8/)*

---

Now that [MAAS is up and running](/maas-cli-1/), it's time to configure it. Normally this would be accomplished through the MAAS configuration UI, but since I'm using the CLI for this, I want to avoid the UI as much as possible.

## Logging in

The first step is logging in. In the CLI, that's a two-stepper:

```bash
stormrider@wintermute:~$ sudo maas apikey --username=admin > api-key-file
```

Verify you got a valid API key by displaying the contents:

```bash
stormrider@wintermute:~$ cat api-key-file
XXEjkeeqM:zXb7LkuPY7VxShFNhCFDaD8WnP8gLVL8V64GbSn:tTKdwW
```

(That string isn't an actual API key — just characters I made up.)

Before logging in, let's try `maas --help` — there's an important distinction that gets skipped over and causes some grief:

```bash
stormrider@wintermute:~$ maas --help
usage: maas [-h] COMMAND ...

optional arguments:
  -h, --help      show this help message and exit

drill down:
  COMMAND
    login         Log in to a remote API, and remember its description and credentials.
    logout        Log out of a remote API, purging any stored credentials.
    list          List remote APIs that have been logged-in to.
    refresh       Refresh the API descriptions of all profiles.
    init          Initialise MAAS in the specified run mode.
    config        View or change controller configuration.
    status        Status of controller services.
    migrate       Perform migrations on connected database.
    apikey        Used to manage a user's API keys.
    configauth    Configure external authentication.
    createadmin   Create a MAAS administrator account.
    changepassword
                  Change a MAAS user's password.
    admin         Interact with http://192.168.43.251:5240/MAAS/api/2.0/
```

This is what you get if you're not logged in, or if you don't type a logged-in username after `maas`. What you see above isn't even half of what the MAAS CLI will do — it's all you get as an unrecognised user.

Now log in:

```bash
stormrider@wintermute:~$ maas login admin \
  http://192.168.43.251:5240/MAAS/api/2.0/ < api-key-file

You are now logged in to the MAAS server at
http://192.168.43.251:5240/MAAS/api/2.0/ with the profile name 'admin'.

For help with the available commands, try:

  maas admin --help
```

## Getting real help

Now the full picture:

```bash
stormrider@wintermute:~$ maas admin --help

usage: maas admin [-h] COMMAND ...

Issue commands to the MAAS region controller at
http://192.168.43.251:5240/MAAS/api/2.0/.

optional arguments:
  -h, --help            show this help message and exit

drill down:
  COMMAND
    account             Manage the current logged-in user.
    bcache-cache-set    Manage bcache cache set on a machine.
    block-device        Manage a block device on a machine.
    block-devices       Manage block devices on a machine.
    boot-resource       Manage a boot resource.
    boot-resources      Manage the boot resources.
    boot-source         Manage a boot source.
    boot-source-selection
                        Manage a boot source selection.
    boot-source-selections
                        Manage the collection of boot source selections.
    boot-sources        Manage the collection of boot sources.
    commissioning-script
                        Manage a custom commissioning script.
    dhcpsnippet         Manage an individual DHCP snippet.
    dhcpsnippets        Manage the collection of all DHCP snippets in MAAS.
    dnsresource         Manage dnsresource.
    dnsresource-record  Manage dnsresourcerecord.
    dnsresources        Manage dnsresources.
    device              Manage an individual device.
    devices             Manage the collection of all the devices in the MAAS.
    discoveries         Query observed discoveries.
    domain              Manage domain.
    domains             Manage domains.
    events              Retrieve filtered node events.
    fabric              Manage fabric.
    fabrics             Manage fabrics.
    ipaddresses         Manage IP addresses allocated by MAAS.
    iprange             Manage IP range.
    ipranges            Manage IP ranges.
    interface           Manage a node's or device's interface.
    interfaces          Manage interfaces on a node.
    maas                Manage the MAAS server.
    machine             Manage an individual machine.
    machines            Manage the collection of all the machines in the MAAS.
    node                Manage an individual Node.
    node-results        Read the collection of commissioning script results.
    node-script         Manage or view a custom script.
    node-script-result  Manage node script results.
    nodes               Manage the collection of all the nodes in the MAAS.
    notification        Manage an individual notification.
    notifications       Manage the collection of all the notifications in MAAS.
    partition           Manage partition on a block device.
    partitions          Manage partitions on a block device.
    pod                 Manage an individual pod.
    pods                Manage the collection of all the pod in the MAAS.
    rack-controller     Manage an individual rack controller.
    rack-controllers    Manage the collection of all rack controllers in MAAS.
    raid                Manage a specific RAID on a machine.
    raids               Manage all RAIDs on a machine.
    region-controller   Manage an individual region controller.
    region-controllers  Manage the collection of all region controllers in MAAS.
    resource-pool       Manage a resource pool.
    resource-pools      Manage resource pools.
    sshkey              Manage an SSH key.
    sshkeys             Manage the collection of all the SSH keys in this MAAS.
    space               Manage space.
    spaces              Manage spaces.
    subnet              Manage subnet.
    subnets             Manage subnets.
    tag                 Manage tags on nodes.
    tags                Manage all tags known to MAAS.
    user                Manage a user account.
    users               Manage the user accounts of this MAAS.
    version             Information about this MAAS instance.
    vlan                Manage a VLAN on a fabric.
    vlans               Manage VLANs on a fabric.
    vm-host             Manage an individual vm-host.
    vm-hosts            Manage the collection of all the vm-hosts in the MAAS.
    zone                Manage a physical zone.
    zones               Manage physical zones.
```

The first time I tried to use the MAAS API (before I hired on at Canonical), I was digging commands out of the documentation and wrestling JSON output with grep. Not fun. Then someone reminded me about `jq` (more on that in a moment), and things got easier. Eventually I learned I'd just missed the "Get help" section in the CLI introduction. After that, a whole new world opened up.

## Setting DNS

The very first blank field you encounter in the MAAS UI is the DNS server IP address. In the UI, I just type `8.8.8.8` and forget about it. But the CLI has no box. There's a subcommand called `dnsresource` — let's see what that does:

```bash
stormrider@wintermute:~$ maas admin dnsresource --help
Usage: maas admin dnsresource [-h] COMMAND ...

Manage dnsresource.

  COMMAND
    read      Read a DNS resource
    update    Update a DNS resource
    delete    Delete a DNS resource
```

Let's try it naively:

```bash
stormrider@wintermute:~$ maas admin dnsresource read
Read a DNS resource by id.
  the following arguments are required: id, data
```

No idea what the "dnsresource id" would be. But the CLI follows the "collection-instance" rule — listing DNS resources would be part of a collection, so it's pluralised. Let's try `dnsresources` (plural):

```bash
stormrider@wintermute:~$ maas admin dnsresources read
Success.
Machine-readable output follows:
[]
```

Hmm. After consulting the documentation — and, I'll admit, annoying my friend Lee until he told me — the right command is:

```bash
stormrider@wintermute:~$ maas admin maas set-config \
  name=upstream_dns value="8.8.8.8"
Success.
Machine-readable output follows:
OK
```

It works. And it works without quotes too:

```bash
stormrider@wintermute:~$ maas admin maas set-config \
  name=upstream_dns value=8.8.8.8
Success.
Machine-readable output follows:
OK
```

*Note to self: always RTFM. Before annoying Lee.*

## Importing images

When I look at the dashboard, images have already been synced — at least one default image is automatic. But I can bring in another (like Ubuntu 16.04 LTS) to see how it works.

Confirming what's already present:

```bash
stormrider@wintermute:~$ maas admin boot-resources read
Success.
Machine-readable output follows:
[
    {
        "id": 7,
        "type": "Synced",
        "name": "grub-efi-signed/uefi",
        "architecture": "amd64/generic",
        "resource_uri": "/MAAS/api/2.0/boot-resources/7/"
    },
    {
        "id": 1,
        "type": "Synced",
        "name": "ubuntu/bionic",
        "architecture": "amd64/ga-18.04",
        "resource_uri": "/MAAS/api/2.0/boot-resources/1/",
        "subarches": "generic,hwe-p,hwe-q,hwe-r,hwe-s,hwe-t,hwe-u,hwe-v,hwe-w,ga-16.04,ga-16.10,ga-17.04,ga-17.10,ga-18.04"
    },
    ...
]
```

A quick grep to confirm 18.04 without wading through all the JSON:

```bash
stormrider@wintermute:~$ maas admin boot-resources read | grep architecture
"architecture": "amd64/generic",
"architecture": "arm64/generic",
"architecture": "ppc64el/generic",
"architecture": "i386/generic",
"architecture": "amd64/ga-18.04",
"architecture": "amd64/ga-18.04-lowlatency",
"architecture": "amd64/hwe-18.04",
"architecture": "amd64/hwe-18.04-edge",
"architecture": "amd64/hwe-18.04-lowlatency",
"architecture": "amd64/hwe-18.04-lowlatency-edge",
```

Those first four are PXE-boot images (open-firmware, uefi, pxe). The rest are 18.04 variants. Confirmed.

## Enter jq

If you're going to use the MAAS CLI — or anything with JSON-based output — learn [jq](https://stedolan.github.io/jq/). For example, a formatted table of names and architectures:

```bash
stormrider@wintermute:~$ maas admin boot-resources read | \
  jq -r '.[] | "\(.name)\t\(.architecture)"'
```

Output:

```
grub-efi-signed/uefi         amd64/generic
grub-efi/uefi                arm64/generic
grub-ieee1275/open-firmware  ppc64el/generic
pxelinux/pxe                 i386/generic
ubuntu/bionic                amd64/ga-18.04
ubuntu/bionic                amd64/ga-18.04-lowlatency
ubuntu/bionic                amd64/hwe-18.04
ubuntu/bionic                amd64/hwe-18.04-edge
ubuntu/bionic                amd64/hwe-18.04-lowlatency
ubuntu/bionic                amd64/hwe-18.04-lowlatency-edge
```

Much more readable. We have the images needed to boot machines, and an 18.04 image set to deploy. Now let's pull down another image. I can select images with `boot-source-selections` — let's try Trusty (Ubuntu 14.04 LTS):

```bash
stormrider@wintermute:~$ maas admin boot-source-selections create 1 \
  os="ubuntu" release="trusty" arches="amd64" subarches="*" \
  labels="*"
Success.
Machine-readable output follows:
{
    "os": "ubuntu",
    "release": "trusty",
    "arches": ["amd64"],
    "subarches": ["*"],
    "labels": ["*"],
    "boot_source_id": 1,
    "id": 2,
    "resource_uri": "/MAAS/api/2.0/boot-sources/1/selections/2/"
}
```

Back in the UI, 14.04 LTS is now "Selected for download." Now trigger the actual download:

```bash
stormrider@wintermute:~$ maas admin boot-resources import
Success.
Machine-readable output follows:
Import of boot resources started
```

14.04 LTS is downloading. Next up: [enabling DHCP](/maas-cli-3/).