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

*Configuring MAAS via the CLI only*

Now that [MAAS is up and
running](https://stormrider.io/maas-cli-1.html), it\'s time to configure
it. Normally, this would be accomplished through the MAAS configuration
journey, but since I\'m using the CLI for this, I want to avoid the UI
as much as possible.

## Logging in

The first step in the config journey is logging in. In the CLI, that\'s
a two-stepper:

``` bash
stormrider@wintermute:~$  sudo maas apikey --username=admin > api-key-file 
sudo maas apikey --username=admin > api-key-file
```

You can make sure you got a valid API key by displaying the contents of
api-key-file:

``` bash
stormrider@wintermute:~$  cat api-key-file 
XXEjkeeqM:zXb7LkuPY7VxShFNhCFDaD8WnP8gLVL8V64GbSn:tTKdwWV64GbSn:tTKdwW
```

Note that string isn\'t an actual API key, just characters I made up.\
Anyway, I can now login to MAAS -- but first, let\'s try maas --help --
there\'s an important distinction that gets skipped over, causing some
grief:

``` bash
stormrider@wintermute:~$  maas --help 
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
      apikey        Used to manage a user's API keys. Shows existing keys unless --generate or --delete is passed.
      configauth    Configure external authentication.
      createadmin   Create a MAAS administrator account.
      changepassword
            Change a MAAS user's password.
      admin         Interact with http://192.168.43.251:5240/MAAS/api/2.0/
```

This is the help you get (a) if you\'re not logged in, or (b) if you
don\'t type a logged-in username after maas - which is a little annoying
to me, but it\'s just how we do it. What you see above isn\'t even half
of what the MAAS CLI will do, but it\'s all you get as an unrecognized
user.

So now, let\'s login and try that help again:

``` bash
stormrider@wintermute:~$  maas login admin http://192.168.43.251:5240/MAAS/api/2.0/ < api-key-file 

You are now logged in to the MAAS server at
http://192.168.43.251:5240/MAAS/api/2.0/ with the profile name 'admin'.

For help with the available commands, try:

maas admin --help
```

## Getting real help

Now, having done that, I can get a much better idea what the CLI will
do:

``` bash
stormrider@wintermute:~$ maas admin --help 

usage: maas admin [-h] COMMAND ...

Issue commands to the MAAS region controller at http://192.168.43.251:5240/MAAS/api/2.0/.

optional arguments:
   -h, --help            show this help message and exit

drill down:
   COMMAND
      account             Manage the current logged-in user.
      bcache-cache-set    Manage bcache cache set on a machine.
      bcache-cache-sets   Manage bcache cache sets on a machine.
      bcache              Manage bcache device on a machine.
      bcaches             Manage bcache devices on a machine.
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
      commissioning-scripts
              Manage custom commissioning scripts.
      dhcpsnippet         Manage an individual DHCP snippet.
      dhcpsnippets        Manage the collection of all DHCP snippets in MAAS.
      dnsresource         Manage dnsresource.
      dnsresource-record  Manage dnsresourcerecord.
      dnsresource-records
              Manage DNS resource records (e.g. CNAME, MX, NS, SRV, TXT)
      dnsresources        Manage dnsresources.
      device              Manage an individual device.
      devices             Manage the collection of all the devices in the MAAS.
      discoveries         Query observed discoveries.
      discovery           Read or delete an observed discovery.
      domain              Manage domain.
      domains             Manage domains.
      events              Retrieve filtered node events.
      fabric              Manage fabric.
      fabrics             Manage fabrics.
      fan-network         Manage Fan Network.
      fan-networks        Manage Fan Networks.
      file                Manage a FileStorage object.
      files               Manage the collection of all the files in this MAAS.
      ipaddresses         Manage IP addresses allocated by MAAS.
      iprange             Manage IP range.
      ipranges            Manage IP ranges.
      interface           Manage a node's or device's interface.
      interfaces          Manage interfaces on a node.
      license-key         Manage a license key.
      license-keys        Manage the license keys.
      maas                Manage the MAAS server.
      machine             Manage an individual machine.
      machines            Manage the collection of all the machines in the MAAS.
      network             Manage a network.
      networks            Manage the networks.
      node                Manage an individual Node.
      node-results        Read the collection of commissioning script results.
      node-script         Manage or view a custom script.
      node-script-result  Manage node script results.
      node-script-results
              Manage node script results.
      node-scripts        Manage custom scripts.
      nodes               Manage the collection of all the nodes in the MAAS.
      notification        Manage an individual notification.
      notifications       Manage the collection of all the notifications in MAAS.
      package-repositories
              Manage the collection of all Package Repositories in MAAS.
      package-repository  Manage an individual package repository.
      partition           Manage partition on a block device.
      partitions          Manage partitions on a block device.
      pod                 Manage an individual pod.
      pods                Manage the collection of all the pod in the MAAS.
      rack-controller     Manage an individual rack controller.
      rack-controllers    Manage the collection of all rack controllers in MAAS.
      raid                Manage a specific RAID (Redundant Array of Independent
              Disks) on a machine.
      raids               Manage all RAIDs (Redundant Array of Independent Disks) on
              a machine.
      region-controller   Manage an individual region controller.
      region-controllers  Manage the collection of all region controllers in MAAS.
      resource-pool       Manage a resource pool.
      resource-pools      Manage resource pools.
      sshkey              Manage an SSH key.
      sshkeys             Manage the collection of all the SSH keys in this MAAS.
      sslkey              Manage an SSL key.
      sslkeys             Operations on multiple keys.
      space               Manage space.
      spaces              Manage spaces.
      static-route        Manage static route.
      static-routes       Manage static routes.
      subnet              Manage subnet.
      subnets             Manage subnets.
      tag                 Tags are properties that can be associated with a Node and
              serve as criteria for selecting and allocating nodes.
      tags                Manage all tags known to MAAS.
      user                Manage a user account.
      users               Manage the user accounts of this MAAS.
      version             Information about this MAAS instance.
      virtual-machine     Manage individual virtual machines.
      virtual-machines    Manage a collection of virtual machines.
      vlan                Manage a VLAN on a fabric.
      vlans               Manage VLANs on a fabric.
      vm-host             Manage an individual vm-host.
      vm-hosts            Manage the collection of all the vm-hosts in the MAAS.
      vmfs-datastore      Manage VMFS datastore on a machine.
      vmfs-datastores     Manage VMFS datastores on a machine.
      volume-group        Manage volume group on a machine.
      volume-groups       Manage volume groups on a machine.
      zone                Manage a physical zone.
      zones               Manage physical zones.

      This is a profile.  Any commands you issue on this profile will
      operate on the MAAS region server.

      The command information you see here comes from the region server's
      API; it may differ for different profiles.  If you believe the API may
      have changed, use the command's 'refresh' sub-command to fetch the
      latest version of this help information from the server.
```

Wowee! Look at all the commands! The very first time I tried to use the
MAAS API (before I actually hired on at Canonical), I was using various
commands I could find in the documentation that actually returned things
I wanted, and then digging it out of the JSON output. Not fun. Then
someone reminded me about `jq` (we\'ll come to that in a minute), and
things got a little easier. Eventually, I asked one of the developers
what the deal was, and learned that I just missed a the section called
\"Get help\" in the CLI introduction. After that, a whole new world
opened up.

But we came here to configure MAAS, not tell stories, so let me see what
I can do with this beast.

## Setting dns

The very first blank line you encounter in the MAAS UI is the DNS server
IP address. In the UI, I just type \"8.8.8.8\" (Google\'s DNS server)
and forget about it. But the CLI has no box, so how do I get there?
Well, there is a subcommand called \<code\>dnsresource\~, let\'s see
what that does.

``` bash
stormrider@wintermute:~$  maas admin dnsresource --help 
Usage: maas admin dnsresource [-h] COMMAND ...

Manage dnsresource.

optional arguments:
   -h, --help  show this help message and exit

drill down:
   COMMAND
      read      Read a DNS resource
      update    Update a DNS resource
      delete    Delete a DNS resource
```

Okay, let\'s be naive and try that:

``` bash
stormrider@wintermute:~$  maas admin dnsresource read 
Usage: maas admin dnsresource read [--help] [-d] [-k] id [data [data ...]]

Read a DNS resource

positional arguments:
   id
   data

optional arguments:
   --help, -h      Show this help message and exit.
   -d, --debug     Display more information about API responses.
   -k, --insecure  Disable SSL certificate check

Read a DNS resource by id.
   the following arguments are required: id, data
```

Well, that isn\'t going to help me, I don\'t have any idea what the
\"dnsresource id\" would be. Hmmm. Oh, wait. This CLI follows the
\"collection-instance\" rule, that is, listing DNS resources would be
part of a collection, so would be pluralized. So, for example, I can
read \<code\>dnsresources\~ (plural) and maybe find out something:

``` bash
stormrider@wintermute:~$  maas admin dnsresources read 
Success.
Machine-readable output follows:
[]
```

Well. Maybe I should try the CLI documentation. Looking at the \"Quick
questions\" under common tasks, I see there\'s one about setting a DNS
forwarder. Let me check that out. Hmmm, yeah, that might be what I want.
There\'s a easy way to tell: I can check the DNS setting in the MAAS
dashboard in the UI, run the CLI command I found, and see if that sets
it.

Okay, actually, I cheated first. I went and asked my friend Lee, who
knows how this works, and I kept asking until I annoyed him. But it\'s
useful to illustrate that there was a way to get this from the doc and
experimentation, which I should have done. \* Sorry, Lee. Owe you lunch.
Maybe that\'s two lunches. \*

Hey, in that field, it even says \"DNS forwarder\" -- so let me try it:

``` bash
stormrider@wintermute:~$  maas admin maas set-config name=upstream_dns value="8.8.8.8" 
Success.
Machine-readable output follows:
OK
```

And it sets it! Woo-hoo, it worked! It wasn\'t obvious whether I needed
to type the IP address with quotes, but I did, and it paid off. I guess
I could try it without quotes to see what happens:

``` bash
stormrider@wintermute:~$ maas admin maas set-config name=upstream_dns value=9.9.9.9 
Success.
Machine-readable output follows:
OK
```

And that works, too, so I\'ll change it back real fast before weird
things start to happen, since I have no idea what \"9.9.9.9\" is.

note to self: *always* RTFM. before annoying my friend Lee.

## Importing images

The next thing would be to import images. When I look at the dashboard,
it\'s already been done, but TBH it was already synched when I logged in
and opened the dashboard, so it must be automatic for at least one
default image. Dunno. But I can bring in some other image (like Ubuntu
16.04 LTS) just to see how that works, and I can figure out how to
confirm that the 18.04 (default) image is actually here.

Well, this time actually consulting the manual, it says I can confirm
18.04 by entering the following command:

``` bash
stormrider@wintermute:~$  maas admin boot-resources read 
```

The JSON resulting from this command is rather lengthy:

``` bash
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
    "id": 8,
    "type": "Synced",
    "name": "grub-efi/uefi",
    "architecture": "arm64/generic",
    "resource_uri": "/MAAS/api/2.0/boot-resources/8/"
    },
    {
    "id": 9,
    "type": "Synced",
    "name": "grub-ieee1275/open-firmware",
    "architecture": "ppc64el/generic",
    "resource_uri": "/MAAS/api/2.0/boot-resources/9/"
    },
    {
    "id": 10,
    "type": "Synced",
    "name": "pxelinux/pxe",
    "architecture": "i386/generic",
    "resource_uri": "/MAAS/api/2.0/boot-resources/10/"
    },
    {
    "id": 1,
    "type": "Synced",
    "name": "ubuntu/bionic",
    "architecture": "amd64/ga-18.04",
    "resource_uri": "/MAAS/api/2.0/boot-resources/1/",
    "subarches": "generic,hwe-p,hwe-q,hwe-r,hwe-s,hwe-t,hwe-u,hwe-v,hwe-w,ga-16.04,ga-16.10,ga-17.04,ga-17.10,ga-18.04"
    },
    {
    "id": 2,
    "type": "Synced",
    "name": "ubuntu/bionic",
    "architecture": "amd64/ga-18.04-lowlatency",
    "resource_uri": "/MAAS/api/2.0/boot-resources/2/",
    "subarches": "generic,hwe-p,hwe-q,hwe-r,hwe-s,hwe-t,hwe-u,hwe-v,hwe-w,ga-16.04,ga-16.10,ga-17.04,ga-17.10,ga-18.04"
    },
    {
    "id": 3,
    "type": "Synced",
    "name": "ubuntu/bionic",
    "architecture": "amd64/hwe-18.04",
    "resource_uri": "/MAAS/api/2.0/boot-resources/3/",
    "subarches": "generic,hwe-p,hwe-q,hwe-r,hwe-s,hwe-t,hwe-u,hwe-v,hwe-w,ga-16.04,ga-16.10,ga-17.04,ga-17.10,ga-18.04"
    },
    {
    "id": 4,
    "type": "Synced",
    "name": "ubuntu/bionic",
    "architecture": "amd64/hwe-18.04-edge",
    "resource_uri": "/MAAS/api/2.0/boot-resources/4/",
    "subarches": "generic,hwe-p,hwe-q,hwe-r,hwe-s,hwe-t,hwe-u,hwe-v,hwe-w,ga-16.04,ga-16.10,ga-17.04,ga-17.10,ga-18.04,hwe-18.10,hwe-19.04"
    },
    {
    "id": 5,
    "type": "Synced",
    "name": "ubuntu/bionic",
    "architecture": "amd64/hwe-18.04-lowlatency",
    "resource_uri": "/MAAS/api/2.0/boot-resources/5/",
    "subarches": "generic,hwe-p,hwe-q,hwe-r,hwe-s,hwe-t,hwe-u,hwe-v,hwe-w,ga-16.04,ga-16.10,ga-17.04,ga-17.10,ga-18.04"
    },
    {
    "id": 6,
    "type": "Synced",
    "name": "ubuntu/bionic",
    "architecture": "amd64/hwe-18.04-lowlatency-edge",
    "resource_uri": "/MAAS/api/2.0/boot-resources/6/",
    "subarches": "generic,hwe-p,hwe-q,hwe-r,hwe-s,hwe-t,hwe-u,hwe-v,hwe-w,ga-16.04,ga-16.10,ga-17.04,ga-17.10,ga-18.04,hwe-18.10,hwe-19.04"
    }
]
```

Okay, that\'s a lot of information, but it looks like I have a bunch of
18.04 images downloaded and synched. Let me try to get a little fancy
with a grep and see if I can make that list shorter:

``` bash
stormrider@wintermute:~$  maas admin boot-resources read | grep architecture 
```

This produces a quick list of the images I\'ve successfully downloaded:

``` bash
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

That definitely confirms 18.04. But what are those three or four on top?
Looking at the massive JSON output, I can see that they have names like
\"open-firmware,\" \"uefi,\" and \"pxe.\" Okay, so those are images that
can PXE-boot machines, basically. But how could I sort this information
out in a neat way?

## Enter jq

If you\'re going to use the MAAS CLI -- or anything with JSON-based
output -- you\'ll want to consider learning the command line tool
[jq](https://stedolan.github.io/jq/). It\'s quite handy for parsing the
JSON output of the MAAS CLI. So, for example, if I want a (sorta)
formatted table of names and architectures, I can run my last command
through jq like this:

``` bash
stormrider@wintermute:~$  maas admin boot-resources read | jq -r '.[] | "\(.name)\t\(.architecture)"' 
```

This gives me a clean image list that looks something like this:

``` bash
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

Okay, I cheated just a little there, too: I cleaned up the tabs a
little, which wouldn\'t be quite as well lined-up unless you have a
really wide tab setting (which is possible). Even what I did isn\'t
enough to straighten it out totally, but the output is still readable,
anyway.

So you can see that I basically have (a) the images I need to boot
machines, and (b) an 18.04 image (set) to deploy. That\'s a good start,
but let me see if I can pull down another image with the CLI. I know I
can select images with the boot-source-selections command, so let me try
that with \"Trusty\" (Xenial Xerus, aka 16.04):

``` bash
stormrider@wintermute:~$ maas admin boot-source-selections create 1 \
  > os="ubuntu" release="trusty" arches="amd64" subarches="*" \
  > labels="*"

```

The results look like this:

``` bash
Success.
Machine-readable output follows:
{
    "os": "ubuntu",
    "release": "trusty",
    "arches": [
    "amd64"
    ],
    "subarches": [
    "*"
    ],
    "labels": [
    "*"
    ],
    "boot_source_id": 1,
    "id": 2,
    "resource_uri": "/MAAS/api/2.0/boot-sources/1/selections/2/"
}
```

And that appeared to work, which is good, because that was a long
command to type correctly! Sure enough, if I look back at my \"Images\"
tab in the UI, 14.04 LTS is now \"Selected for download.\" Okay, this
CLI seems to be working fairly well, let me just keep going and see if I
can get it to download, now.

In reality, downloading them -- ahem, I mean \"importing\" them -- is a
fairly simple command:

``` bash
stormrider@wintermute:~$ maas admin boot-resources import 
Success.
Machine-readable output follows:
Import of boot resources started
```

Now when I switch back to the Images screen, I can see that 14.04 LTS is
downloading, which is fantastic. I\'ll just let that download for a
while and then move on to [enabling
DHCP](https://stormrider.io/maas-cli-3.html).
