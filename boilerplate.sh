#!/bin/bash
printf "${PWD##*/}/\n"
printf "  this is a comment on the directory \"${PWD##*/}/\"\n"
printf "  when listing the full path for each item,\n"
printf "  comments are indented 2 spaces after their entry.\n\n"
printf "  empty lines are OK!\n\n"
find . -name '.git' -prune -o \
       -name 'node_modules' -prune -o \
       -name '.sass-cache' -prune -o \
       -printf '%h/%f %y\n' | sed -e '1d' -e 's/ d$/\//' -e 's/ f$//' -e "s/^\./${PWD##*/}/"
      #-name 'your_folder_to_ignore' -prune -o
