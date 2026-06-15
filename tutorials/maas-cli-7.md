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

*Logging into deployed machines with SSH, and copying files to them with
SCP*

Now that we have some running machines, what if we just set ourselves up
to SSH into one of them? Making this work will also allow us to scp
files in -- and I\'m sure you can see how we\'d provision a machine from
there. We can also do the provisioning with MAAS, if we\'re clever, but
I\'ll leave that to my next post.

First things first: we need to build the MAAS infrastructure necessary
to play with this feature.

## Create a KVM

We start by creating a vm-host. Let\'s play dumb and walk our way
through this; first, we\'ll just try creating a vm-host, like this:

``` bash
maas admin vm-host create
```

This doesn\'t give anything like the expected result:

``` bash
usage: maas admin vm-host [-h] COMMAND ...

Manage an individual vm-host.

optional arguments:
  -h, --help  show this help message and exit

drill down:
  COMMAND
    refresh   Refresh a pod
    parameters
          Obtain pod parameters
    compose   Compose a pod machine
    add-tag   Add a tag to a pod
    remove-tag
          Remove a tag from a pod
    read
    update    Update a specific pod
    delete    Deletes a pod

A vm-host is identified by its id.

argument COMMAND: invalid choice: 'create' (choose from 'refresh', 'parameters', 'compose', 'add-tag', 'remove-tag', 'read', 'update', 'delete')
```

Oops, forgot about the collective pluralism of the MAAS CLI -- we need
to use vm-hosts to create one, because we\'re adding to the collection,
so the correct command should look something like this:

``` bash
maas admin vm-hosts create
```

Still not quite what we expected, but we\'re failing forward fast, which
is a great way to learn new software. As a side note, it\'s not great
for skydiving, but that\'s another story altogether. The MAAS CLI tells
us we need to specify a type:

``` bash
{"type": ["This field is required."]}
```

Of course! We have to specify what kind of vm-host we want; in this
case, it\'s going to be an LXD vm-host, so we modify our previous
command like this:

``` bash
maas admin vm-hosts create type=lxd
```

Oops, still one more thing to enter: the power~address~:

``` bash
{"power_address": ["This field is required."]}
```

We need to update our command to tell MAAS what LXD instance we\'re
going to use. The power~address~ for an LXD vm-host is of the form
`https://<gateway-ip-address>:8443`. The `8443` is the default port when
you ran lxd init to get LXD started, after installing it. The rest is
just what you learn by experience, or by reading blogs like this one.

In my case, the LXD gateway is 10.38.31.1 at the moment, so my modified
command would be:

``` bash
maas admin vm-hosts create type=lxd power_address=https://10.38.31.1:8443
```

Within seconds, we get a success message and JSON output. From now on,
I\'ll leave the JSON output for you to generate and view on your own,
unless it bears specifically on the discussion. In this case, all that
we\'ll need is the last non-bracket line of the JSON return, which is:

``` bash
"resource_uri": "/MAAS/api/2.0/pods/7/"
```

What we\'ll need in the next step is the vm-host ID, which is the number
on the end of the resource~uri~ -- specifically, \"7\".

By way of additional confirmation, we could pull up the MAAS UI and see
that an LXD \"KVM HOST TYPE\" named \"wintermute\" has been created.
This might be a good moment to bring up some terminology dissonance,
which is nothing unusual for an open-source product. Originally,
vm-hosts were called \"pods,\" hence the word \"pods\" in the resource
URI. Later, they were changed to \"KVM hosts\" to correspond to the term
\"KVM,\" used commonly by libvirt. Note that libvirt was, at one time,
the only common vm-host used by MAAS. As the product transitioned to
using more than one VM tool -- that is, LXD -- the team decided a more
inclusive name was needed, hence \"VM host.\"

## Composing a machine

Having a VM host is great, but we can\'t demonstrate ssh/scp machine
actions without a virtual machine running on that host. Let\'s create
one. This may get tricky, so let\'s start by looking at the MAAS CLI
help:

``` bash
maas admin --help
```

This gives us the following, very long command list:

``` bash
usage: maas admin [-h] COMMAND ...

Issue commands to the MAAS region controller at http://192.168.56.91:5240/MAAS/api/2.0/.

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
            Manage DNS resource records (e.g. CNAME, MX, NS, SRV,
            TXT)
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
    notifications       Manage the collection of all the notifications in
            MAAS.
    package-repositories
            Manage the collection of all Package Repositories in
            MAAS.
    package-repository  Manage an individual package repository.
    partition           Manage partition on a block device.
    partitions          Manage partitions on a block device.
    pod                 Manage an individual pod.
    pods                Manage the collection of all the pod in the MAAS.
    rack-controller     Manage an individual rack controller.
    rack-controllers    Manage the collection of all rack controllers in MAAS.
    raid                Manage a specific RAID (Redundant Array of Independent
            Disks) on a machine.
    raids               Manage all RAIDs (Redundant Array of Independent
            Disks) on a machine.
    region-controller   Manage an individual region controller.
    region-controllers  Manage the collection of all region controllers in
            MAAS.
    resource-pool       Manage a resource pool.
    resource-pools      Manage resource pools.
    sshkey              Manage an SSH key.
    sshkeys             Manage the collection of all the SSH keys in this
            MAAS.
    sslkey              Manage an SSL key.
    sslkeys             Operations on multiple keys.
    space               Manage space.
    spaces              Manage spaces.
    static-route        Manage static route.
    static-routes       Manage static routes.
    subnet              Manage subnet.
    subnets             Manage subnets.
    tag                 Tags are properties that can be associated with a Node
            and serve as criteria for selecting and allocating
            nodes.
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

We\'re looking to compose a machine here, so where would you look
instinctively? Well, the first thought might be machines, so we can give
that help screen a try:

``` bash
maas admin machines --help
```

This produces a few commands:

``` bash
usage: maas admin machines [-h] COMMAND ...

Manage the collection of all the machines in the MAAS.

optional arguments:
  -h, --help            show this help message and exit

drill down:
  COMMAND
    is-registered       MAC address registered
    set-zone            Assign nodes to a zone
    power-parameters    Get power parameters
    accept              Accept declared machines
    accept-all          Accept all declared machines
    release             Release machines
    list-allocated      List allocated
    allocate            Allocate a machine
    add-chassis         Add special hardware
    clone               Clone storage and/or interface configurations
    read                List Nodes visible to the user
    create              Create a new machine
    is-action-in-progress
            MAC address of deploying or commissioning node
```

This list is interesting, but there isn\'t a specific compose command
here. We could go down the garden path with maas admin machines create,
but first, let\'s see if the vm-host command has anything we\'re
seeking:

``` bash
maas admin vm-host --help
```

Bingo. Found the command; do you see it in this list?

``` bash
usage: maas admin vm-host [-h] COMMAND ...

Manage an individual vm-host.

optional arguments:
  -h, --help  show this help message and exit

drill down:
  COMMAND
    refresh   Refresh a pod
    parameters
          Obtain pod parameters
    compose   Compose a pod machine
    add-tag   Add a tag to a pod
    remove-tag
          Remove a tag from a pod
    read
    update    Update a specific pod
    delete    Deletes a pod

A vm-host is identified by its id.
```

Okay, so maas admin vm-host compose is the root command, let\'s see what
it requires:

``` bash
maas admin vm-host compose --help
```

Wow! This command is incredibly robust, including some NUMA stuff (which
we\'ll look at in a later post):

``` bash
usage: maas admin vm-host compose [--help] [-d] [-k] id [data [data ...]]

Compose a pod machine


Positional arguments:
    id


This method accepts keyword arguments.  Pass each argument as a
key-value pair with an equals sign between the key and the value:
key1=value1 key2=value key3=value3.  Keyword arguments must come after
any positional arguments.

Compose a new machine from a pod.

:param cores: Optional.  The minimum number of CPU cores.
:type cores: Int

 :param memory: Optional.  The minimum amount of memory,
specified in MiB (e.g. 2 MiB == 2*1024*1024).
:type memory: Int

 :param hugepages_backed: Optional.  Whether to request
hugepages backing for the machine.
:type hugepages_backed: Boolean

 :param pinned_cores: Optional.  List of host CPU cores
to pin the VM to. If this is passed, the "cores" parameter is ignored.
:type pinned_cores: Int

 :param cpu_speed: Optional.  The minimum CPU speed,
specified in MHz.
:type cpu_speed: Int

 :param architecture: Optional.  The architecture of
the new machine (e.g. amd64). This must be an architecture the pod
supports.
:type architecture: String

 :param storage: Optional.  A list of storage
constraint identifiers in the form ``label:size(tag,tag,...),
label:size(tag,tag,...)``. For more information please see the CLI
pod management page of the official MAAS documentation.
:type storage: String

 :param interfaces: Optional.  A
labeled constraint map associating constraint labels with desired
interface properties. MAAS will assign interfaces that match the
given interface properties.

Format: ``label:key=value,key=value,...``

Keys:

- ``id``: Matches an interface with the specific id
- ``fabric``: Matches an interface attached to the specified fabric.
- ``fabric_class``: Matches an interface attached to a fabric
  with the specified class.
- ``ip``: Matches an interface whose VLAN is on the subnet implied by
  the given IP address, and allocates the specified IP address for
  the machine on that interface (if it is available).
- ``mode``: Matches an interface with the specified mode. (Currently,
  the only supported mode is "unconfigured".)
- ``name``: Matches an interface with the specified name.
  (For example, "eth0".)
- ``hostname``: Matches an interface attached to the node with
  the specified hostname.
- ``subnet``: Matches an interface attached to the specified subnet.
- ``space``: Matches an interface attached to the specified space.
- ``subnet_cidr``: Matches an interface attached to the specified
  subnet CIDR. (For example, "192.168.0.0/24".)
- ``type``: Matches an interface of the specified type. (Valid
  types: "physical", "vlan", "bond", "bridge", or "unknown".)
- ``vlan``: Matches an interface on the specified VLAN.
- ``vid``: Matches an interface on a VLAN with the specified VID.
- ``tag``: Matches an interface tagged with the specified tag.
:type interfaces: String

 :param hostname: Optional.  The hostname of the newly
composed machine.
:type hostname: String

 :param domain: Optional.  The ID of the domain in which
to put the newly composed machine.
:type domain: Int

 :param zone: Optional.  The ID of the zone in which to
put the newly composed machine.
:type zone: Int

 :param pool: Optional.  The ID of the pool in which to
put the newly composed machine.
:type pool: Int


Common command-line options:
    --help, -h
    Show this help message and exit.
    -d, --debug
    Display more information about API responses.
    -k, --insecure
    Disable SSL certificate check
```

We could get fancy, but for these purposes, we just need a machine. The
only thing that\'s absolutely required besides the command we already
got \"help\" for is the vm-host ID. Remember that line of JSON from
above? The ID is \"7\" -- so we\'ll enter this command:

``` bash
maas admin vm-host compose 7
```

Hey, how about that! We got some feedback with a machine system~id~:

``` bash
Success.
Machine-readable output follows:
{
    "system_id": "xttpfx",
    "resource_uri": "/MAAS/api/2.0/machines/xttpfx/"
}
```

We can use this, along with some of our jq tricks, to see if this
machine is commissioning (as expected):

``` bash
maas admin machines read | jq -r '(["HOSTNAME","SYSID",
"POWER","STATUS","OWNER", "TAGS", "POOL","VLAN","FABRIC",
"SUBNET"] | (., map(length*"-"))),(.[] | [.hostname, .system_id, 
.power_state, .status_name, .owner // "-",.tag_names[0] // "-", 
.pool.name,.boot_interface.vlan.name,.boot_interface.vlan.fabric,
.boot_interface.links[0].subnet.name]) | @tsv' | column -t
```

This gives the following output on my machine:

``` bash
HOSTNAME    SYSID   POWER  STATUS   OWNER  TAGS     POOL     VLAN      FABRIC    SUBNET
--------    -----   -----  ------   -----  ----     ----     ----      ------    ------
native-cub  xttpfx  on     Testing  admin  virtual  default  untagged  fabric-1  10.38.31.0/24
```

By the time I got this command typed in, commissioning had already
nearly finished, and the machine was in the \"testing\" phase. If we run
this command again now, we should see that it\'s in the \"Ready\" state:

``` bash
HOSTNAME    SYSID   POWER  STATUS  OWNER  TAGS     POOL     VLAN      FABRIC    SUBNET
--------    -----   -----  ------  -----  ----     ----     ----      ------    ------
native-cub  xttpfx  off    Ready   -      virtual  default  untagged  fabric-1  10.38.31.0/24
```

## Getting the machine to a login state

We can\'t SSH into it, because it automatically turned off after
commissioning, and anyway, we didn\'t have a chance to ask for SSH keys
to be loaded during the commissioning process. Let\'s run that
commissioning again, with SSH keys enabled, and making sure that it\'s
left on after it\'s done. For this operation, we just use the standard
machine commands, because the vm-host is hosting a MAAS machine, which
is the same as any other MAAS machine:

``` bash
maas admin machine commission xttpfx enable_ssh=1
```

This will return a success message (be sure to substitute the \"xttpfx\"
with whatever your composed machine system~id~ turns out to be; your
mileage may vary). After a little while, the machine should return to a
\"Ready\" state again, but this time, with the power left on, and with
SSH keys passed to the machine, so that we can login to it. We can check
this without complex jq command again:

``` bash
HOSTNAME    SYSID   POWER  STATUS  OWNER  TAGS     POOL     VLAN      FABRIC    SUBNET
--------    -----   -----  ------  -----  ----     ----     ----      ------    ------
native-cub  xttpfx  on     Ready   -      virtual  default  untagged  fabric-1  10.38.31.0/24
```

## Logging into a commissioned machine

So it\'s \"Ready\" and it\'s powered on, that\'s good. In order to log
in, we\'ll need to know the machine\'s IP address. There are several
ways to get this, but by far the easiest, IMHO, is just using the lxc
command:

``` bash
lxc list
```

This will give us the following output:

``` bash
+------------+---------+---------------------+-----------------------------------------------+-----------------+-----------+
|    NAME    |  STATE  |        IPV4         |                     IPV6                      |      TYPE       | SNAPSHOTS |
+------------+---------+---------------------+-----------------------------------------------+-----------------+-----------+
| first-one  | RUNNING | 10.38.31.193 (eth0) |                                               | CONTAINER       | 0         |
+------------+---------+---------------------+-----------------------------------------------+-----------------+-----------+
| native-cub | RUNNING | 10.38.31.202 (eth0) | fd42:fd4c:6ab9:19bc:216:3eff:fe9e:bc7b (eth0) | VIRTUAL-MACHINE | 0         |
+------------+---------+---------------------+-----------------------------------------------+-----------------+-----------+
```

This brings up some important nuances about the LXD list. Note that
there are two machines, one of which is a CONTAINER that I use for
general testing of new software. The other, \"native-cub,\" is the
VIRTUAL-MACHINE we just created, and that\'s the one whose IP address we
want for SSH purposes: 10.38.31.202.

Okay, so now we can try logging in via SSH, using the \"ubuntu\" user
(always):

``` bash
ssh ubuntu@10.38.31.202
```

We get the expected first-login response:

``` bash
The authenticity of host '10.38.31.202 (10.38.31.202)' can't be established.
ECDSA key fingerprint is SHA256:hkKRDyRDG9JcsSmAQ0ir5jy0UKQ+PrU/FTJr36U3bvw.
Are you sure you want to continue connecting (yes/no/[fingerprint])? 
```

And if we say \"yes,\" we should get this result:

``` bash
Warning: Permanently added '10.38.31.202' (ECDSA) to the list of known hosts.
Welcome to Ubuntu 20.04.1 LTS (GNU/Linux 5.4.0-64-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Mon Feb  1 00:11:52 UTC 2021

  System load:    0.0       Processes:               127
  Usage of /home: unknown   Users logged in:         0
  Memory usage:   10%       IPv4 address for enp5s0: 10.38.31.202
  Swap usage:     0%

14 updates can be installed immediately.
2 of these updates are security updates.
To see these additional updates run: apt list --upgradable

tmpfs-root /media/root-rw tmpfs rw,relatime 0 0
overlayroot / overlay rw,relatime,lowerdir=/media/root-ro,upperdir=/media/root-rw/overlay,workdir=/media/root-rw/overlay-workdir/_ 0 0
/dev/loop0 /media/root-ro squashfs ro,relatime 0 0


The programs included with the Ubuntu system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Ubuntu comes with ABSOLUTELY NO WARRANTY, to the extent permitted by
applicable law.

To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

ubuntu@native-cub:~$ 
```

## Using SCP

We can jump out of this machine and use its IP address to copy files
over to it. First, let\'s make sure that there isn\'t anything in the
local directory on the machine:

``` bash
ls
```

And we get what we\'d expect:

``` bash
ubuntu@native-cub:~$ ls
ubuntu@native-cub:~$ 
```

So now, let\'s exit the machine with exit, and just touch a file called
\"zork\" (a very uncommon filename) in the CWD on the local machine:

``` bash
ubuntu@native-cub:~$ exit
logout
Connection to 10.38.31.202 closed.
stormrider@wintermute:~$ touch zork
stormrider@wintermute:~$ ls
 api-key-file   Credentials   Dropbox   Pictures      snap            Templates
 Backups        Desktop       git       Public        stormrider.io   Videos
 BRF            Documents     mnt      '#scratch#'    temp            Websites
 Code           Downloads     Music     Show-n-Tell   temp~           zork
stormrider@wintermute:~$ 
```

Now, let\'s try to scp (secure copy) the file over to the machine,
login, and see if the file made it:

``` bash
stormrider@wintermute:~$ scp ./zork ubuntu@10.38.31.202:
zork                                          100%    0     0.0KB/s   00:00    
stormrider@wintermute:~$ ssh ubuntu@10.38.31.202
Welcome to Ubuntu 20.04.1 LTS (GNU/Linux 5.4.0-64-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Mon Feb  1 00:20:42 UTC 2021

  System load:    0.0       Processes:               123
  Usage of /home: unknown   Users logged in:         0
  Memory usage:   10%       IPv4 address for enp5s0: 10.38.31.202
  Swap usage:     0%


14 updates can be installed immediately.
2 of these updates are security updates.
To see these additional updates run: apt list --upgradable

tmpfs-root /media/root-rw tmpfs rw,relatime 0 0
overlayroot / overlay rw,relatime,lowerdir=/media/root-ro,upperdir=/media/root-rw/overlay,workdir=/media/root-rw/overlay-workdir/_ 0 0
/dev/loop0 /media/root-ro squashfs ro,relatime 0 0

Last login: Mon Feb  1 00:19:34 2021 from 10.38.31.1
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

ubuntu@native-cub:~$ ls
zork
ubuntu@native-cub:~$ 
```

Cool! So we can copy files to a machine! Neat.

## Copying files to a deployed machine

Copying files to a commissioned machine doesn\'t do us much good, of
course, since the machine gets wiped out and reloaded on deployment.
Let\'s acquire and deploy that same machine, and then try logging in and
copying files again. First, we have to acquire and deploy the machine:

``` bash
maas admin machines allocate system_id=xttpfx
```

(Success message and JSON data stream)

``` bash
maas admin machine deploy xttpfx
```

(Success message and JSON data stream)

``` bash
maas admin machines read | jq -r '(["HOSTNAME","SYSID", 
"POWER","STATUS","OWNER", "TAGS", "POOL","VLAN","FABRIC",
"SUBNET"] | (., map(length*"-"))),(.[] | [.hostname, .system_id, 
.power_state, .status_name, .owner // "-",.tag_names[0] // "-", 
.pool.name,.boot_interface.vlan.name,.boot_interface.vlan.fabric,
.boot_interface.links[0].subnet.name]) | @tsv' | column -t

HOSTNAME    SYSID   POWER  STATUS     OWNER  TAGS     POOL     VLAN      FABRIC    SUBNET
--------    -----   -----  ------     -----  ----     ----     ----      ------    ------
native-cub  xttpfx  on     Deploying  admin  virtual  default  untagged  fabric-1  10.38.31.0/24
```

When it finally reaches the \"Deployed\" state, we can try and log into
it:

``` bash
stormrider@wintermute:~$ ssh ubuntu@10.38.31.2
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the ECDSA key sent by the remote host is
SHA256:AsOdI357mZdmymQG/bmZzbtrDwZPKNYwdUDgCecHHhI.
Please contact your system administrator.
Add correct host key in /home/stormrider/.ssh/known_hosts to get rid of this message.
Offending ECDSA key in /home/stormrider/.ssh/known_hosts:20
  remove with:
  ssh-keygen -f "/home/stormrider/.ssh/known_hosts" -R "10.38.31.2"
ECDSA host key for 10.38.31.2 has changed and you have requested strict checking.
Host key verification failed.
```

What??!!?? This is supposed to work, isn\'t it??

No worries! On deployment, the SSH key just got updated, so just do what
the message suggests, and you can SSH in normally:

``` bash
stormrider@wintermute:~$ ssh-keygen -f "/home/stormrider/.ssh/known_hosts" -R "10.38.31.2"
# Host 10.38.31.2 found: line 20
/home/stormrider/.ssh/known_hosts updated.
Original contents retained as /home/stormrider/.ssh/known_hosts.old
stormrider@wintermute:~$ ssh ubuntu@10.38.31.2
The authenticity of host '10.38.31.2 (10.38.31.2)' can't be established.
ECDSA key fingerprint is SHA256:AsOdI357mZdmymQG/bmZzbtrDwZPKNYwdUDgCecHHhI.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '10.38.31.2' (ECDSA) to the list of known hosts.
Welcome to Ubuntu 20.04.1 LTS (GNU/Linux 5.4.0-65-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Mon Feb  1 00:34:27 UTC 2021

  System load:  0.08              Processes:               133
  Usage of /:   48.2% of 6.78GB   Users logged in:         0
  Memory usage: 10%               IPv4 address for enp5s0: 10.38.31.2
  Swap usage:   0%

14 updates can be installed immediately.
2 of these updates are security updates.
To see these additional updates run: apt list --upgradable



The programs included with the Ubuntu system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Ubuntu comes with ABSOLUTELY NO WARRANTY, to the extent permitted by
applicable law.

To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

ubuntu@native-cub:~$ 
```

## Copying a script over there and running it

So first, let\'s verify that the script we want to copy over there
isn\'t already there. In fact, to keep it simple, let\'s just create a
simple and fun script to see what scp can get us. First, we\'ll need to
install a couple of software packages on the deployed machine:

``` bash
ubuntu@native-cub:~$ fortune

Command 'fortune' not found, but can be installed with:

sudo apt install fortune-mod

ubuntu@native-cub:~$ sudo apt install fortune-mod
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following additional packages will be installed:
  fortunes-min librecode0
Suggested packages:
  fortunes x11-utils
The following NEW packages will be installed:
  fortune-mod fortunes-min librecode0
0 upgraded, 3 newly installed, 0 to remove and 17 not upgraded.
Need to get 615 kB of archives.
After this operation, 2135 kB of additional disk space will be used.
Do you want to continue? [Y/n] Y
Get:1 http://archive.ubuntu.com/ubuntu focal/main amd64 librecode0 amd64 3.6-24 [523 kB]
Get:2 http://archive.ubuntu.com/ubuntu focal/universe amd64 fortune-mod amd64 1:1.99.1-7build1 [37.3 kB]
Get:3 http://archive.ubuntu.com/ubuntu focal/universe amd64 fortunes-min all 1:1.99.1-7build1 [55.1 kB]
Fetched 615 kB in 3s (203 kB/s)    
Selecting previously unselected package librecode0:amd64.
(Reading database ... 71387 files and directories currently installed.)
Preparing to unpack .../librecode0_3.6-24_amd64.deb ...
Unpacking librecode0:amd64 (3.6-24) ...
Selecting previously unselected package fortune-mod.
Preparing to unpack .../fortune-mod_1%3a1.99.1-7build1_amd64.deb ...
Unpacking fortune-mod (1:1.99.1-7build1) ...
Selecting previously unselected package fortunes-min.
Preparing to unpack .../fortunes-min_1%3a1.99.1-7build1_all.deb ...
Unpacking fortunes-min (1:1.99.1-7build1) ...
Setting up librecode0:amd64 (3.6-24) ...
Setting up fortunes-min (1:1.99.1-7build1) ...
Setting up fortune-mod (1:1.99.1-7build1) ...
Processing triggers for man-db (2.9.1-1) ...
Processing triggers for libc-bin (2.31-0ubuntu9.1) ...
ubuntu@native-cub:~$ ddate

Command 'ddate' not found, but can be installed with:

sudo apt install ddate

ubuntu@native-cub:~$ sudo apt install ddate
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following NEW packages will be installed:
  ddate
0 upgraded, 1 newly installed, 0 to remove and 17 not upgraded.
Need to get 10.8 kB of archives.
After this operation, 34.8 kB of additional disk space will be used.
Get:1 http://archive.ubuntu.com/ubuntu focal/universe amd64 ddate amd64 0.2.2-1build1 [10.8 kB]
Fetched 10.8 kB in 1s (20.0 kB/s)
Selecting previously unselected package ddate.
(Reading database ... 71424 files and directories currently installed.)
Preparing to unpack .../ddate_0.2.2-1build1_amd64.deb ...
Unpacking ddate (0.2.2-1build1) ...
Setting up ddate (0.2.2-1build1) ...
Processing triggers for man-db (2.9.1-1) ...
ubuntu@native-cub:~$ cowsay

Command 'cowsay' not found, but can be installed with:

sudo apt install cowsay

ubuntu@native-cub:~$ sudo apt install cowsay
Reading package lists... Done
Building dependency tree       
Reading state information... Done
Suggested packages:
  filters cowsay-off
The following NEW packages will be installed:
  cowsay
0 upgraded, 1 newly installed, 0 to remove and 17 not upgraded.
Need to get 18.5 kB of archives.
After this operation, 93.2 kB of additional disk space will be used.
Get:1 http://archive.ubuntu.com/ubuntu focal/universe amd64 cowsay all 3.03+dfsg2-7 [18.5 kB]
Fetched 18.5 kB in 2s (7603 B/s) 
Selecting previously unselected package cowsay.
(Reading database ... 71431 files and directories currently installed.)
Preparing to unpack .../cowsay_3.03+dfsg2-7_all.deb ...
Unpacking cowsay (3.03+dfsg2-7) ...
Setting up cowsay (3.03+dfsg2-7) ...
Processing triggers for man-db (2.9.1-1) ...
ubuntu@native-cub:~$ 
```

Now we can drop back and write a script that uses these three packages
to produce an interesting result. Here\'s what should be in the script:

``` bash
#!/bin/bash
ddate > /tmp/foo
echo '   ' >> /tmp/foo
fortune -s >> /tmp/foo
cat /tmp/foo | cowsay
```

Add the text above to a script called motd.sh, and then chmod 777
motd.sh. Then, use the following command to copy the script to the
deployed machine:

``` bash
scp ./motd.sh ubuntu@10.38.31.2:
```

Then we can log back into the deployed machine and check the permissions
on motd.sh in the arriving CWD:

``` bash
ssh ubuntu@10.38.31.2
...
ls -lsa motd.sh

ubuntu@native-cub:~$ ls -lsa motd.sh
4 -rwxrwxr-x 1 ubuntu ubuntu 97 Feb  1 00:49 motd.sh
ubuntu@native-cub:~$ 
```

On my machine, it didn\'t copy the permissions precisely, but it is
executable by me, so I can run it and get the highly-important output:

``` bash
 ________________________________________
/ Today is Boomtime, the 32nd day of     \
| Chaos in the YOLD 3187                 |
|                                        |
| Water, taken in moderation cannot hurt |
| anybody.                               |
|                                        |
\ -- Mark Twain                          /
 ----------------------------------------
    \   ^__^
     \  (oo)\_______
        (__)\       )\/\
        ||----w |
        ||     ||
```

## Summary

So we see that it\'s possible to deploy a machine and then load usable
software on it. Certainly, that\'s one method MAAS users depend on to
get their machines configured -- probably using scripts or install
packages that they scp over and kick off. There are more sophisticated
ways to make this happen, and we\'ll cover those in a future post,
maybe. In the meantime, though, let\'s try a few more jq tricks.
