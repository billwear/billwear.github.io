```{=org}
#+DUNSEL: this just touches the file: flip
```
[Networks](https://stormrider.io/networking.html) \~
[MAAS](https://stormrider.io/maas.html) \~ [Raspberry
Pi](https://stormrider.io/pi4.html) \~
[Warsurfing](https://stormrider.io/warsurfing.html) \~
[Org-mode](https://stormrider.io/org-mode.html)

Standard MAAS images are downloaded from
[images.maas.io](https://images.maas.io) into the MAAS region
controller\'s cache, the layout of which is shown below. To see what
goes into a MAAS image, we can snapshot
[images.maas.io](https://images.maas.io) like this:

``` example
Index of /
[ICO]   Name            Last modified          Size
[DIR]   ephemeral-v2/   2016-05-17 18:17    -
[DIR]   ephemeral-v3/   2020-10-14 14:35    -
[DIR]   ephemeral/  2013-09-13 18:23    -
[DIR]   query/  2017-05-02 18:38    -
[DIR]   streams/    2013-08-22 05:04    -
Apache/2.4.29 (Ubuntu) Server at images.maas.io Port 443
```

We\'ll ignore everything but the `ephemeral-v3` directory for this
discussion; it contains the following:

``` example
Index of /ephemeral-v3
[ICO]        Name          Last modified     Size
[PARENTDIR]  Parent Directory                  -
[DIR]        candidate/        2022-05-15 21:40    -
[DIR]        daily/        2020-06-17 13:05    -
[DIR]        stable/           2022-08-11 20:04    -
Apache/2.4.29 (Ubuntu) Server at images.maas.io Port 443
```

As of this writing, the [MAAS documentation](https://maas.io/docs) tell
us that the [candidate
stream](https://maas.io/docs/how-to-import-images#heading--candidate-stream)
\"contains images and bootloaders which have not been explicitly tested
with MAAS.\" These images may be more up-to-date than others in the
repository.

Similarly, the [stable
stream](https://maas.io/docs/how-to-import-images#heading--stable-stream)
\"contains images and bootloaders which have been tested with the latest
version of MAAS\", so these images are more likely to be reliable and
error-free than the candidate stream. This stream is intended for
production use.

The [daily
stream](https://maas.io/docs/how-to-import-images#heading--daily-stream)
has been retired, even though it retains a subdirectory. Any attempts to
pull from the daily stream are automatically redirected to the stable
stream.

## What\'s in a stream?

Delving into the stable stream gives us this listing:

``` example
Index of /ephemeral-v3/stable
[ICO]    Name              Last modified     Size
[PARENTDIR]  Parent Directory             -
[DIR]    bionic/       2020-10-07 21:13   -
[DIR]    bootloaders/      2020-10-07 21:13   -
[DIR]    centos/       2020-11-19 19:05   -
[DIR]    focal/            2020-10-07 21:13   -
[DIR]    groovy/       2020-10-07 21:13   -
[DIR]    hirsute/      2020-11-03 23:03   -
[DIR]    impish/       2021-05-17 21:04   -
[DIR]    jammy/            2022-04-20 16:06   -
[DIR]    kinetic/      2022-08-11 20:04   -
[DIR]    precise/      2020-10-07 21:13   -
[DIR]    streams/      2020-10-22 15:49   -
[DIR]    trusty/       2020-10-07 21:13   -
[DIR]    xenial/       2020-10-07 21:13   -
Apache/2.4.29 (Ubuntu) Server at images.maas.io Port 443
```

You can see that there are stable Ubuntu images for a number of
different Unbuntu releases, dating back several years. *Not all of these
images will work on all versions of MAAS, BTW.* Just looking at the
latest stable release (`jammy`), we can get a picture of what\'s
included with the image stream:

``` example
Index of /ephemeral-v3/stable/jammy
[ICO]    Name              Last modified     Size
[PARENTDIR]  Parent Directory             -
[DIR]    amd64/            2022-08-11 20:05   -
[DIR]    arm64/            2022-08-11 20:05   -
[DIR]    armhf/            2022-08-11 20:05   -
[DIR]    ppc64el/      2022-08-11 20:05   -
[DIR]    s390x/            2022-08-11 20:05   -
Apache/2.4.29 (Ubuntu) Server at images.maas.io Port 443
```

The stream is sorted by architecture, so let\'s examine the `amd64`
architecture, one of the most common instances used for MAAS:

``` example
Index of /ephemeral-v3/stable/jammy/amd64
[ICO]    Name              Last modified     Size
[PARENTDIR]  Parent Directory             -
[DIR]    20220616/     2022-06-24 15:04   -
[DIR]    20220712.1/       2022-07-14 21:05   -
[DIR]    20220718/     2022-07-21 19:01   -
[DIR]    20220808/     2022-08-11 20:03   -
Apache/2.4.29 (Ubuntu) Server at images.maas.io Port 443
```

Here, we see that there are several different versions, roughly one per
month. If we choose the latest (`20220808`), we begin to see the anatomy
of an image:

``` example
Index of /ephemeral-v3/stable/jammy/amd64/20220808
[ICO]    Name              Last modified     Size
[PARENTDIR]  Parent Directory             -
[DIR]    ga-22.04/     2022-08-11 20:04   -
[ ]          squashfs      2022-08-08 14:26  404M
[ ]          squashfs.manifest 2022-08-08 14:26   16K
Apache/2.4.29 (Ubuntu) Server at images.maas.io Port 443
```

So we\'ve picked up one component of the image, the
[SquashFS](https://en.wikipedia.org/wiki/SquashFS), a compressed,
read-only filesystem that can be loaded into RAMdisk for the ephemeral
image to use (e.g., when commissioning a MAAS machine). You can get an
idea of what\'s in this SquashFS by looking at the `squashfs.manifest`.
The first part of this particular manifest file looks like this:

``` example
adduser 3.118ubuntu5
apparmor    3.0.4-2ubuntu2.1
apport  2.20.11-0ubuntu82.1
apport-symptoms 0.24
apt 2.4.5
apt-utils   2.4.5
base-files  12ubuntu4.1
base-passwd 3.5.52build1
bash    5.1-6ubuntu1
bash-completion 1:2.11-5ubuntu1
bc  1.07.1-3build1
bcache-tools    1.0.8-4ubuntu3
bind9-dnsutils  1:9.18.1-1ubuntu1.1
bind9-host  1:9.18.1-1ubuntu1.1
```

It\'s obvious that this is (mostly) just a list of packages to be
included with the running system. If you want to peruse the whole thing,
you can go to [images.maas.io](https://images.maas.io) and download the
manifest file, which is plain text.

To round out this part of the image, we can double-jump straight to
`ga-22.04/generic` to find:

``` example
[ICO]    Name              Last modified     Size
[PARENTDIR]  Parent Directory             -
[ ]          boot-initrd       2022-08-08 14:26  106M
[ ]          boot-kernel       2022-08-08 14:26   11M
```

Here we see an [initial
ramdisk](https://en.wikipedia.org/wiki/Initial_ramdisk) (`boot-initrd`),
which loads a temporary, in-memory `root` filesystem for use by a
booting ephemeral kernel on startup. You\'ll also notice that the
ephemeral kernel is located in this directory, as well.

### What else do we need?

This *almost* completes the picture of the MAAS image. We have a kernel,
a temporary root filesystem, and an extended filesystem in compressed
form. What\'s missing? Well, the bootloader, which is back at the top
level of our streams directory:

``` example
Index of /ephemeral-v3/stable
[ICO]    Name              Last modified     Size
[PARENTDIR]  Parent Directory             -
[DIR]    bionic/       2020-10-07 21:13   -
[DIR]    bootloaders/      2020-10-07 21:13   -
[DIR]    centos/       2020-11-19 19:05   -
[DIR]    focal/            2020-10-07 21:13   -
[DIR]    groovy/       2020-10-07 21:13   -
[DIR]    hirsute/      2020-11-03 23:03   -
[DIR]    impish/       2021-05-17 21:04   -
[DIR]    jammy/            2022-04-20 16:06   -
[DIR]    kinetic/      2022-08-11 20:04   -
[DIR]    precise/      2020-10-07 21:13   -
[DIR]    streams/      2020-10-22 15:49   -
[DIR]    trusty/       2020-10-07 21:13   -
[DIR]    xenial/       2020-10-07 21:13   -
Apache/2.4.29 (Ubuntu) Server at images.maas.io Port 443
```

Without walking all the directories under bootloaders, we can summarize
the contents like this:

- the `open-firmware` directory contains some number of compressed
  [`grub`](https://en.wikipedia.org/wiki/GNU_GRUB) archives for various
  architectures, updated with a new version every time a new MAAS image
  set is pushed.

- the `pxe` directory contains compressed
  [`syslinux`](https://en.wikipedia.org/wiki/SYSLINUX) archives, sorted
  by architecture and release date.

- the `uefi` directory contains compressed `grub` and
  [`shim`](https://wiki.debian.org/SecureBoot) (secure boot) archives,
  again sorted by architecture and release date.

This set of files covers all the possible boot configurations that this
ephemeral image can support.

## What an image contains

A MAAS simplestreams image, then, contains the following four things:

1.  A kernel.\
2.  A bootloader.\
3.  An initial RAMdisk (temporary root filesystem).\
4.  A SquashFS compressed (\"complete\") filesystem.

As you can see from the foregoing discussion, there are many different
architectures and update versions for each of these.

## How the rack controller lays it down on disk

When you downloaded MAAS images from the simplestreams, you\'re actually
just downloading them to the rack controller. In fact, until they *are*
downloaded to the rack controller, they can\'t be deployed.

### Image directory

For the MAAS snap, the rack controller stores its images in
`/var/snap/maas/common/maas/boot-resources/current`. A typical image
layout might look like this:

``` example
 4 drwxr-xr-x 5 root root  4096 Aug 11 15:38 bootloader
 4 drwxr-xr-x 3 root root  4096 Aug 11 15:38 centos
 4 drwxr-xr-x 3 root root  4096 Aug 11 15:38 custom
 4 drwxr-xr-x 2 root root  4096 Aug 11 15:39 grub
 4 -rw-r--r-- 1 root root   238 Aug 11 15:39 ipxe.cfg
92 -rw-r--r-- 1 root root 92070 Aug 16 15:36 maas.meta
 4 drwxr-xr-x 3 root root  4096 Aug 11 15:38 rhel
 4 drwxr-xr-x 3 root root  4096 Aug 11 15:38 ubuntu
```

### The bootloader

The typical `bootloader` directory might look like this:

``` example
total 20
4 drwxr-xr-x 5 root root 4096 Aug 11 15:38 .
4 drwxr-xr-x 8 root root 4096 Aug 11 15:39 ..
4 drwxr-xr-x 3 root root 4096 Aug 11 15:38 open-firmware
4 drwxr-xr-x 3 root root 4096 Aug 11 15:38 pxe
4 drwxr-xr-x 4 root root 4096 Aug 11 15:38 uefi
```

1.  open-firmware/ppc64el/bootppc64.bin

    This example directory contains the `bootppc64.bin` open firmware
    bootloader for [PowerPC](https://en.wikipedia.org/wiki/Ppc64)
    processors.

2.  pxe/i386

    This example directory contains various bootloaders and associated
    `syslinux` programs for the SYSLINUX PXE bootloader. The bootloaders
    typically found in this directory include `lpxelinux.0` and
    `pxelinux.0`.

3.  uefi

    The files in this example directory would typically include various
    extensible firmware interface (EFI) bootloaders for booting systems
    under various conditions. Typical files might include:

    - arm64/bootaa64.efi\
    - amd64/bootx64.efi\
    - arm64/grubaa64.efi\
    - amd64/grubx64.efi

### centos

This directory typically contains various CentOS images supported by
MAAS. These images are sorted by directory (e.g.,
`centos/amd64/generic/8/stable`), since they are typically all named
`root-tgz`.

### custom

### grub

### ipxe.cfg

### maas.meta

### rhel

### ubuntu

## Links to commonly used files

For convenience, a number of symbolic links to common files are kept in
the `current` directory:

  link            points to
  --------------- ------------------------------------------------
  bootaa64.efi    bootloader/uefi/arm64/bootaa64.efi
  bootppc64.bin   bootloader/open-firmware/ppc64el/bootppc64.bin
  bootx64.efi     bootloader/uefi/amd64/bootx64.efi
  chain.c32       bootloader/pxe/i386/chain.c32
  grubaa64.efi    bootloader/uefi/arm64/grubaa64.efi
  grubx64.efi     bootloader/uefi/amd64/grubx64.efi
  ifcpu64.c32     bootloader/pxe/i386/ifcpu64.c32
  ldlinux.c32     bootloader/pxe/i386/ldlinux.c32
  libcom32.c32    bootloader/pxe/i386/libcom32.c32
  libutil.c32     bootloader/pxe/i386/libutil.c32
  lpxelinux.0     bootloader/pxe/i386/lpxelinux.0
  pxelinux.0      lpxelinux.0
  syslinux        bootloader/pxe/i386
