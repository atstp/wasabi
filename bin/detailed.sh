#!/bin/bash

printf "${PWD##*/}/\n"
find . -name '.git' -prune -o \
       -name 'node_modules' -prune -o \
       -name '.sass-cache' -prune -o \
       -printf '%h/%f %y\n' | sed -e '1d' -e 's/ d$/\//' -e 's/ f$//' -e "s/^\./${PWD##*/}/"
#      -name 'your_folder_to_ignore' -prune -o \
