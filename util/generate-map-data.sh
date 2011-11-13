#!/bin/bash
#  Genereate world map data (tile codes) as 256x256 matrix of two
#  digit hex
#  Example:
#     util/generate-map-data.sh  c64u4/ULTIMA4C.D64 

if [ $# -ne 1 ]; then
   echo "usage: generate-map-data.sh <britannid-disk>" 1>&2
   exit 1
fi

FILE=$1

for y in {0..15}; do
    BASE=$((256 * 16 * $y + 256))
    CMD="paste "
    for x in {0..15}; do
        CMD=${CMD}"<(xxd -g1 -l256 -s $(($BASE + (256 * $x))) $FILE | cut -c10-56) "
    done
    CMD=$CMD" | tr -d ' \t'"
    eval $CMD
done
