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

*More neat things to do with jq*

I previously covered basic usage of jq with MAAS a couple of posts ago.
Now I want to dig in a little bit, and see what else I can do with it.\
sorting natively with jq

In my previous jq post, I showed how to use Linux command line utilities
to sort lines in a multi-record jq output. It\'s not the only way -- nor
maybe even the easiest way. The jq tool has a native sort capability.
Let\'s take a look.

Suppose we have a random list of machines that I quickly created on one
of my local MAAS installs -- haven\'t even bothered to commission them,
since that doesn\'t matter here. If I run the command:

``` bash
maas admin machines read | jq -r '(["HOSTNAME","SYSID",
"TAGS", "POOL","ZONE"] | (., map(length*"-"))),
(.[] | [.hostname, .system_id, .tag_names[0] // "-", 
.pool.name,.zone.name]) | @tsv' | column -t
```

on my very casually defined set of new machines, I\'ll get a listing
something like this:

``` bash
HOSTNAME       SYSID   TAGS      POOL      ZONE
--------       -----   ----      ----      ----
nearby-louse   ed8pda  plover    swimming  defense
novel-cod      4ds3eh  dunnet    swimming  fault
nearby-koala   k6cagg  xyzzy     car       twilight
superb-koi     6sqads  xyzzy     swimming  twilight
amazed-hermit  mehgsk  xyzzy     swimming  twilight
daring-minnow  ceamb4  plover    car       demilitarized
ace-colt       hfm84c  zork      tidal     defense
unique-donkey  tsf8tk  plover    tidal     demilitarized
mutual-cod     sxbkyp  bedquilt  tidal     defense
fun-ibex       8pq6qx  zork      car       fault
```

These aren\'t really sorted by anything, in particular, so let\'s just
start at the front and work our way in, shall we?\
sorting by one parameter

Rather than passing our output through an awk script, we can just use
the jq construct for sorting, which is:

``` bash
sort_by(<fieldname>)
```

For example, if we wanted to sort by HOSTNAME, we could try:

``` bash
maas admin machines read | jq -r '(["HOSTNAME","SYSID",
"TAGS", "POOL","ZONE"] | (., map(length*"-"))),
(.[] | [.hostname, .system_id, .tag_names[0] // "-", 
.pool.name,.zone.name] | sort_by(.hostname)) | @tsv' | column -t
```

This doesn\'t give us anything like what we want, just a mysterious
error:

``` bash
jq: error (at <stdin>:2911): Cannot index string with string "hostname"
HOSTNAME  SYSID  TAGS  POOL  ZONE
--------  -----  ----  ----  ----
```

Huh? Don\'t you just link pipes together, and they work?

## jq is not UNIX (jqNU?)

No, that\'s UNIX, but that\'s not necessarily jq. Too see what\'s wrong,
we have to break down the earlier jq statement a little more -- you
know, the one that just gives us the unsorted list:

``` bash
maas admin machines read | jq -r '(["HOSTNAME","SYSID",
"TAGS", "POOL","ZONE"] | (., map(length*"-"))),
(.[] | [.hostname, .system_id, .tag_names[0] // "-", 
.pool.name,.zone.name]) | @tsv' | column -t
```

If we read it from left to right, we have the MAAS command that
generates the JSON to begin with:

``` bash
maas admin machines read
```

We pipe that through jq, with raw output:

``` bash
| jq -r
```

We give jq some series of commands, between the single quotes:

``` bash
'(["HOSTNAME", blah, blah, blah | @tsv'
```

Finally, we pipe that to column to make the columns line up nicely:

``` bash
| column -t
```

So essentially, from a UNIX perspective, we have a data source and two
filters:

``` bash
maas <options> | jq <options> | column <options>
```

The options we give to jq most definitely don\'t work like UNIX.\
where\'s the data coming from?

A great question to ask yourself when building jq blocks is, \"Where\'s
the data coming from?\" Let\'s take a closer look at the jq options:

``` bash
'(["HOSTNAME","SYSID","TAG","POOL","ZONE"] |
(.,map(length*"-"))),
(.[]  |
[.hostname, .system_id, .tag_names[0] // "-",.pool.name,.zone.name]) |
@tsv'
```

Ask yourself where the array data is coming from. Does anything in this
line retrieve data?

``` bash
'(["HOSTNAME","SYSID","TAG","POOL","ZONE"] |
```

Nope. Those are literals, which don\'t retrieve any data at all. How
about the next line?

``` bash
(.,map(length*"-"))),
```

No, that line acts on data it gets, but it doesn\'t get data. And the
next one?

``` bash
(.[] |
```

Yep, that\'s it. The .\[\] command tells jq to iterate over what it
gets. The rest of the line just tells jq which of the fields in the
.\[\] iteration to actually retrieve.

So by process of elimination, there\'s only one place we could sort data
-- where it comes into the command, that is, where we currently iterate
over the incoming JSON arrays, .\[\].

## So how does \"sortby()\" work?

The \"sortby()\" subcommand operates on whatever it gets. In this case,
we\'re sending it a JSON array of machine datasets. So there are two
things wrong with our first attempt:

``` bash
maas admin machines read | jq -r '(["HOSTNAME","SYSID",
"TAGS", "POOL","ZONE"] | (., map(length*"-"))),
(.[] | [.hostname, .system_id, .tag_names[0] // "-", 
.pool.name,.zone.name] | sort_by(.hostname)) | @tsv' | column -t
```

First, it\'s set up to handle a single JSON dataset, and sort it by a
single parameter -- sort~by~(.hostname) -- so there\'s actually nothing
to sort, hence an error. Second, we trying to pipe a formatted entry
from an array of JSON datasets through it, which doesn\'t even make any
sense: you can\'t sort one thing.

To make the command work, we have to make sort~by~ itself the data
source. In other words, we want jq to sort the record stream before it
gets our field list, like this:

``` bash
maas admin machines read | jq -r '(["HOSTNAME","SYSID","TAG","POOL","ZONE"] | (., map(length*"-"))),(sort_by(.hostname)[] | [.hostname,.system_id,.tag_names[0],.pool.name,.zone.name]) | @tsv' | column -t
```

As we can see, this command works as we expect:

``` bash
HOSTNAME       SYSID   TAG       POOL      ZONE
--------       -----   ---       ----      ----
ace-colt       hfm84c  zork      tidal     defense
amazed-hermit  mehgsk  xyzzy     swimming  twilight
daring-minnow  ceamb4  plover    car       demilitarized
fun-ibex       8pq6qx  zork      car       fault
mutual-cod     sxbkyp  bedquilt  tidal     defense
nearby-koala   k6cagg  xyzzy     car       twilight
nearby-louse   ed8pda  plover    swimming  defense
novel-cod      4ds3eh  dunnet    swimming  fault
superb-koi     6sqads  xyzzy     swimming  twilight
unique-donkey  tsf8tk  plover    tidal     demilitarized
```

Reading the new command from left to right helps understand it.
Basically, it reads: \"Take the data for all machines from MAAS, display
a heading line and a horizontal rule line; then sort the machine data by
hostname, and show the following 5 parameters, in tab-separated rows,
lined up in neat columns.\"

## Checking our work

We can check our work by trying different sorts:

``` bash
maas admin machines read | jq -r '(["HOSTNAME","SYSID","TAG","POOL","ZONE"] | (., map(length*"-"))),(sort_by(.system_id)[] | [.hostname,.system_id,.tag_names[0],.pool.name,.zone.name]) | @tsv' | column -t
```

This command sorts by system ID:

``` bash
HOSTNAME       SYSID   TAG       POOL      ZONE
--------       -----   ---       ----      ----
novel-cod      4ds3eh  dunnet    swimming  fault
superb-koi     6sqads  xyzzy     swimming  twilight
fun-ibex       8pq6qx  zork      car       fault
daring-minnow  ceamb4  plover    car       demilitarized
nearby-louse   ed8pda  plover    swimming  defense
ace-colt       hfm84c  zork      tidal     defense
nearby-koala   k6cagg  xyzzy     car       twilight
amazed-hermit  mehgsk  xyzzy     swimming  twilight
mutual-cod     sxbkyp  bedquilt  tidal     defense
unique-donkey  tsf8tk  plover    tidal     demilitarized
```

We can also try pool name:

``` bash
maas admin machines read | jq -r '(["HOSTNAME","SYSID","TAG","POOL","ZONE"] | (., map(length*"-"))),(sort_by(.pool.name)[] | [.hostname,.system_id,.tag_names[0],.pool.name,.zone.name]) | @tsv' | column -t
```

which also works as we\'d expect:

``` bash
HOSTNAME       SYSID   TAG       POOL      ZONE
--------       -----   ---       ----      ----
nearby-koala   k6cagg  xyzzy     car       twilight
daring-minnow  ceamb4  plover    car       demilitarized
fun-ibex       8pq6qx  zork      car       fault
nearby-louse   ed8pda  plover    swimming  defense
novel-cod      4ds3eh  dunnet    swimming  fault
superb-koi     6sqads  xyzzy     swimming  twilight
amazed-hermit  mehgsk  xyzzy     swimming  twilight
ace-colt       hfm84c  zork      tidal     defense
unique-donkey  tsf8tk  plover    tidal     demilitarized
mutual-cod     sxbkyp  bedquilt  tidal     defense
```

## Sorting by more than one parameter

To sort by more than one parameter, simply include a comma-separated
list of parameters for the sort, in order. For example, to sort by tag
first and pool next, use this incantation:

``` bash
maas admin machines read | jq -r '(["HOSTNAME","SYSID","TAG","POOL","ZONE"] | (., map(length*"-"))),(sort_by(.tag_names[0],.pool.name)[] | [.hostname,.system_id,.tag_names[0],.pool.name,.zone.name]) | @tsv' | column -t
```

This will give you:

``` bash
mutual-cod     sxbkyp  bedquilt  tidal     defense
novel-cod      4ds3eh  dunnet    swimming  fault
daring-minnow  ceamb4  plover    car       demilitarized
nearby-louse   ed8pda  plover    swimming  defense
unique-donkey  tsf8tk  plover    tidal     demilitarized
nearby-koala   k6cagg  xyzzy     car       twilight
superb-koi     6sqads  xyzzy     swimming  twilight
amazed-hermit  mehgsk  xyzzy     swimming  twilight
fun-ibex       8pq6qx  zork      car       fault
ace-colt       hfm84c  zork      tidal     defense
```

You can even try three parameters. Note that I set this up with the two
hosts \"superb-koi\" and \"amazed-hermit\" -- so we can use a command
like this to see how multiple parameters work:

``` bash
maas admin machines read | jq -r '(["HOSTNAME","SYSID","TAG","POOL","ZONE"] | (., map(length*"-"))),(sort_by(.tag_names[0],.pool.name,.hostname)[] | [.hostname,.system_id,.tag_names[0],.pool.name,.zone.name]) | @tsv' | column -t
```

Note that \"superb-koi\" and \"amazed-hermit\" have changed places in
the listing below:

``` bash
HOSTNAME       SYSID   TAG       POOL      ZONE
--------       -----   ---       ----      ----
mutual-cod     sxbkyp  bedquilt  tidal     defense
novel-cod      4ds3eh  dunnet    swimming  fault
daring-minnow  ceamb4  plover    car       demilitarized
nearby-louse   ed8pda  plover    swimming  defense
unique-donkey  tsf8tk  plover    tidal     demilitarized
nearby-koala   k6cagg  xyzzy     car       twilight
amazed-hermit  mehgsk  xyzzy     swimming  twilight
superb-koi     6sqads  xyzzy     swimming  twilight
fun-ibex       8pq6qx  zork      car       fault
ace-colt       hfm84c  zork      tidal     defense
```

## Summary

So there\'s a little more jq for you, but still a lot more to learn.
Might as well keep going with this, it seems to be useful to some folks
-- so more jq to come.
