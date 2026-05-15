### Fifty-two years of Unix CLI

[What is this site all about?](https://github.com/billwear/cli-improved/)

---

#### pwd (The link-smart version)
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

[pwd source on GitHub](https://github.com/billwear/cli-improved/bin/pwd) | [pwd manpage](https://github.com/billwear/cli-improved/man/pwd.1)

---

### which (The visibility version)
The standard system which utility has a massive, often frustrating blind spot: it only searches for executable binaries located on your $PATH. If you have a custom shell function or an alias intercepting a command name in your current session, standard which will ignore it completely and point to the binary on the disk. This creates "path-blindness" and leads to the "Wrong Tool" syndrome, where you think you are running one version of a tool, but a hidden configuration is actually running another.

By shadowing the binary with a native shell function that utilizes type -a, we force the shell to reveal its entire command-resolution chain. This version acts as a true environment audit, identifying if a command is an alias, a shell builtin, a function, or a file on the disk, and listing them all in their exact order of execution precedence.

#### The implementation

```
which() {
    # Force the shell to audit the command name completely
    type -a "$@"
}
```

#### Why I chose this approach
Using the internal shell builtin `type -a` is faster and more accurate than spawning an external binary like `/usr/bin/which`. It asks the current shell directly how it intends to execute a command. If you have multiple versions of a tool installed (e.g., a system version and a homebrew version), this function lists all of them in order, rather than stopping at the first match. Because this is declared as a function, the shell naturally prioritizes it over the system binary without requiring you to destructively overwrite or modify your local path configuration.

[which source on GitHub](https://github.com/billwear/cli-improved/bin/which.bashrc) | [which manpage](https://github.com/billwear/cli-improved/man/which.1)
