#!/bin/sh
#  Read 8 byte char-bitmap from diskimage 
#  Example for displaying bitmap for letter A
#     ./charmap-from-disk.sh ../c64u4/ULTIMA4A.D64 $((256*246+65*8-1))

if [ $# -ne 2 ]; then
  echo "charmap-from-disk.sh <d64-file> <offset>" 1>&2
  exit 1
fi

FILE=$1
OFFSET=$(($2 + 1))

xxd -l8 -g1 -c1 -b -s $OFFSET $FILE | cut -c10-17 | tr '01' '.*'