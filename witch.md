**witch** is a version of `which` that substitutes `type`, which gives clearer and more comprehensive output on most systems.

here's the code:

```
#!/bin/sh

type -a "$@"
```

<small>*This is free and unencumbered software released into the public domain.
For more information, please refer to <https://unlicense.org/>.*</small>
