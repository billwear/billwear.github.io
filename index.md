### Fifty-two years of Unix CLI

[What is this site all about?](https://github.com/billwear/cli-improved/blob/847b6f4c81ec1bbae6edc59bd4659ada0d285e7a/README.md)

#### pwd (The Smart-Link Version)
Standard pwd often suffers from "path-blindness." When you are working in environments that rely heavily on symbolic links—like complex development builds or nested cloud directories—it is easy to lose track of where you logically are versus where the files physically exist. Standard output only gives you one or the other, forcing you to run extra commands to verify your actual location.

This wrapper automatically compares the logical path (-L) and the physical path (-P). If they differ, it displays the full chain with a visual indicator (=>). If the paths are identical, it stays transparent and executes the system default, keeping your terminal output clean.

##### The implementation
```
#!/bin/bash

# Capture logical and physical paths
DASHLPATH=$(pwd -L)
DASHPPATH=$(pwd -P)

# If paths differ, show the link chain; otherwise, run standard pwd
if [[ $DASHLPATH != $DASHPPATH ]]; then 
  echo $DASHLPATH "=>" $DASHPPATH
else
  /bin/pwd
fi
```

[View Source on GitHub](https://github.com/billwear/cli-improved/blob/bcb6c8d7e73ae9fb799aa762c00d1976c61d36d2/bin/pwd) | [Read the Manpage](https://github.com/billwear/cli-improved/blob/bcb6c8d7e73ae9fb799aa762c00d1976c61d36d2/man/pwd.1)
