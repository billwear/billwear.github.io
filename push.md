**push** stages everything<sub>1</sub> in the current working directory for a `git` commit, commits with the generic message "autopush," and pushes the commit upstream. 

here's the code:

```
#!/bin/zsh
git add .;
git commit -m "autopush"
git push
```

<small>(1) note that every `git commit` is controlled by the `.gitignore` file, so "everything" actually means "whatever is allowed to be committed by `.gitignore`.</small>

<small>*This is free and unencumbered software released into the public domain.
For more information, please refer to <https://unlicense.org/>.*</small>

