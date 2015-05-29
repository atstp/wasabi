#!/bin/bash
echo ${PWD##*/}/
ls --classify --recursive -1 $@ | sed '/^$/{
  d;
}
/:$/{
  s/:$/\//;
  h;
  d;
}
G;
s/\([^\n]\+\)\n\(.\+$\)/\2\1/;' | sort | \
perl -npe 's/[^\/]+\/(?!$)/  /g'
