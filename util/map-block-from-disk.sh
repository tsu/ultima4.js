#!/bin/sh
#  View map block from disk
#  Example: ./map-block-from-disk.sh ../c64u4/ULTIMA4C.D64 35

if [ $# -ne 2 ]; then
  echo "map-block-from-disk.sh <d64-file> <block-number>" 1>&2
  exit 1
fi

FILE=$1
BLOCK=$2

./extract-bytes $FILE $(($BLOCK*256)) 256 | xxd -g1 | cut -c10-56 | sed 's/01/. /g; s/04/__/g; s/05/ff/g; s/06/HH/g; s/07/MM/g'
