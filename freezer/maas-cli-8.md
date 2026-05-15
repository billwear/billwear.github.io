---
layout: page
title: "MAAS from the CLI: More jq Tricks"
permalink: /maas-cli-8/
description: "Going deeper with jq and MAAS — native sorting with sort_by(), multi-parameter sorts, and understanding why jq isn't Unix (and what to do about it)."
series: maas-cli
series_part: 8
---

*Part of a series: [Install](/maas-cli-1/) · [Configure](/maas-cli-2/) · [DHCP](/maas-cli-3/) · [Commission](/maas-cli-4/) · [Deploy](/maas-cli-5/) · [jq](/maas-cli-6/) · [SSH](/maas-cli-7/) · [More jq](/maas-cli-8/)*

---

Previously I showed how to use Linux utilities like `awk` and `sort` to sort jq output. There's also a native jq approach — and understanding why it works the way it does teaches you something important about jq itself.

## Starting point

A casually-defined set of machines, not even commissioned:

```bash
maas admin machines read | jq -r '(["HOSTNAME","SYSID",
"TAGS", "POOL","ZONE"] | (., map(length*"-"))),
(.[] | [.hostname, .system_id, .tag_names[0] // "-",
.pool.name,.zone.name]) | @tsv' | column -t
```

Output (unsorted):

```
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

## jq is not Unix

The intuitive attempt at sorting:

```bash
maas admin machines read | jq -r '(["HOSTNAME","SYSID",
"TAGS", "POOL","ZONE"] | (., map(length*"-"))),
(.[] | [.hostname, .system_id, .tag_names[0] // "-",
.pool.name,.zone.name] | sort_by(.hostname)) | @tsv' | column -t
```

Error:

```
jq: error (at <stdin>:2911): Cannot index string with string "hostname"
```

The problem: jq is not Unix. You can't just chain pipes and expect filters to work on whatever comes before them the way Unix commands do.

## Where does the data come from?

The key question to ask when building jq expressions is: *where is the data coming from?*

Break the jq block down:

```
(["HOSTNAME","SYSID","TAG","POOL","ZONE"] |    ← literals, no data
(.,map(length*"-"))),                          ← acts on data, doesn't fetch it
(.[]  |                                        ← HERE. this fetches data.
[.hostname, .system_id, ...])
```

`.[]` is the only place data enters the expression. That's the only place sorting can happen.

## How sort_by() actually works

`sort_by()` operates on whatever it receives. To sort the machines, it needs to receive the entire array of machine datasets — before the field extraction happens.

Wrong (sorting after extraction, one record at a time):

```bash
(.[] | [...fields...] | sort_by(.hostname))
```

Right (sorting the array, then extracting fields):

```bash
(sort_by(.hostname)[] | [...fields...])
```

The corrected command:

```bash
maas admin machines read | jq -r '(["HOSTNAME","SYSID","TAG","POOL","ZONE"] | (., map(length*"-"))),(sort_by(.hostname)[] | [.hostname,.system_id,.tag_names[0],.pool.name,.zone.name]) | @tsv' | column -t
```

Output:

```
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

Read the command left to right: "Take all machine data from MAAS, display a heading and rule; then sort the machine data by hostname and show these 5 parameters in tab-separated, aligned columns."

## Sorting by other fields

By system ID:

```bash
sort_by(.system_id)[]
```

By pool name (nested key — no problem):

```bash
sort_by(.pool.name)[]
```

## Sorting by multiple parameters

Pass a comma-separated list. Sort by tag first, then pool:

```bash
sort_by(.tag_names[0],.pool.name)[]
```

Output:

```
HOSTNAME       SYSID   TAG       POOL      ZONE
--------       -----   ---       ----      ----
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

Three parameters — tag, pool, then hostname — resolves ties between machines that share both tag and pool:

```bash
sort_by(.tag_names[0],.pool.name,.hostname)[]
```

Note that `amazed-hermit` and `superb-koi` swap positions — they share tag `xyzzy` and pool `swimming`, so hostname becomes the tiebreaker.

## Summary

jq's `sort_by()` is cleaner than the `awk` approach for many use cases. The key insight: make `sort_by()` the data source, not a filter applied after field extraction. Once that clicks, multi-parameter sorting is straightforward.

There's still a lot more jq to explore — but this covers the patterns you'll use 95% of the time with MAAS.