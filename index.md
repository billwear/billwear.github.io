### Fifty-two years of Unix CLI

• Smart **pwd** command: prints out full-chain symbolic link if that's how you got to the working directory:

    #!/bin/bash

    DASHLPATH=$(pwd -L)
    DASHPPATH=$(pwd -P)
    if [[ $DASHLPATH != $DASHPPATH ]]; then 
      echo $DASHLPATH "=>" $DASHPPATH
    else
      /bin/pwd
    fi




