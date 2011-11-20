#!/bin/bash
#  Genereate font data as 8x8 bitmaps for 128 characters as hex dump for 1024 bytes
#  Example:
#     util/generate-font-data.sh  c64u4/ULTIMA4A.D64 

if [ $# -ne 1 ]; then
   echo "usage: generate-font-data.sh <game-disk>" 1>&2
   exit 1
fi

FILE=$1

xxd -p  -s $((256*246)) -l1024 $FILE
