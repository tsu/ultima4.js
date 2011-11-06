#!/bin/bash
#  Read 16x16 bit tile-bitmap from diskimage 
#  Example for displaying bitmap for player icon
#     ./tilemap-from-disk.sh ../c64u4/ULTIMA4A.D64 31

if [ $# -ne 2 ]; then
  echo "tilemap-from-disk.sh <d64-file> <tile-code>" 1>&2
  exit 1
fi

FILE=$1
OFFSET_1=$((256*359 + $2 * 8 * 2))
OFFSET_2=$((256*359 + $2 * 8 * 2 + 8))
OFFSET_3=$((256*359 + $2 * 8 * 2 + 4096))
OFFSET_4=$((256*359 + $2 * 8 * 2 + 4096 + 8))

paste -d' ' <(xxd -l8 -g1 -c1 -b -s $OFFSET_1 $FILE | cut -c10-17 | tr '01' '.*') \
            <(xxd -l8 -g1 -c1 -b -s $OFFSET_2 $FILE | cut -c10-17 | tr '01' '.*') | tr -d ' '
paste -d' ' <(xxd -l8 -g1 -c1 -b -s $OFFSET_3 $FILE | cut -c10-17 | tr '01' '.*') \
            <(xxd -l8 -g1 -c1 -b -s $OFFSET_4 $FILE | cut -c10-17 | tr '01' '.*') | tr -d ' '

