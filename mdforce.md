**mdforce** uses `-p` by default to always create the entire path it's given.

you could make this one a shell alias with little trouble.

here's the code:

```
#!/bin/zsh

mkdir -p "$@"
```

<small>*This is free and unencumbered software released into the public domain.
For more information, please refer to <https://unlicense.org/>.*</small>
