**dayte** prints a more robust and informative dateline:

```
Mon Sep 07 17:29 2026 ~ Epoch 1788820169 ~ Day 250 of 365; 115 remain
```
> **[eyewtk](https://billwear.github.com/dayte-eyewtk.md)**: everything you ever wanted to know about dayte & all its tangents.

the odd spelling? so you can root it into ```/usr/local/bin``` and run it anywhere without conflicting with ```date```. 

**strong recommendation**: never monkey with *sealed* system directories, like ```/bin```.

here's the ~~code~~ script:

```bash
#!/bin/zsh

# run date once and evaluate the output into shell variables
eval $(/bin/date '+y=%Y d=%j fmt="%a %b %d %H:%M %Y ~ Epoch %s"')

# force the day string into base-10 to prevent octal errors on days like 008 or 009
d=$((10#$d))

# calculate total days in the year
t=$(( (y % 4 == 0 && y % 100 != 0) || y % 400 == 0 ? 366 : 365 ))

# print the final string (printf omits the trailing newline by default)
printf "%s ~ Day %d of %d; %d remain\n" "$fmt" "$d" "$t" "$((t - d))"
```

<small>*This is free and unencumbered software released into the public domain.
For more information, please refer to <https://unlicense.org/>.*</small>

