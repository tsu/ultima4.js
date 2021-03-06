#!/bin/sh
#  View town map (4 blocks) from disk
#  Example, 1st level of lord british castle
#     ./town-map-from-disk.sh ../c64u4/ULTIMA4B.D64 257

if [ $# -ne 2 ]; then
  echo "town-map-from-disk.sh <d64-file> <block-number>" 1>&2
  exit 1
fi

FILE=$1
BLOCK=$(($2 + 0))
UTIL_DIR=`dirname $0`

$UTIL_DIR/extract-bytes $FILE $(($BLOCK*256)) 1024 | xxd -g1 -c32 | cut -c10-104 | \
    sed 's/7f/##/g; s/04/__/g; s/05/ff/g; s/06/FF/g; s/3e/,./g; s/3b/||/g; s/7d/[]/g; s/30/()/g; s/02/../g; s/3f/,,/g; s/16/--/g; s/33/\/\//g; s/34/\\\\/g; s/48/XX/g; s/49/%%/g; s/3c/$$/g; s/7a/==/g; s/7b/==/g; s/7c/==/g; s/47/-_/g; s/3d/o+/g' | \
    tr -d ' ' | sed 's/00/  /g; s/01/. /g'

