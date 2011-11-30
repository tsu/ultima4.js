#!/bin/bash
#  Generate data for town inhabitants, 32x8 bytes per town (17)
#  Example
#     ./generate-inhabitant-data.sh ../c64u4/ULTIMA4B.D64 

if [ $# -ne 1 ]; then
  echo "generate-inhabitant-data.sh <towne-disk>" 1>&2
  exit 1
fi

FILE=$1
BLOCK_BASE=$((257+4))

# Loop towns
for town in {0..16}; do
    # Loop inhabitant data in town
    for i in {0..31}; do 
        xxd -g1 -c32 -l256 -s$(((BLOCK_BASE+5*$town)*256)) $FILE | cut -d" " -f$(($i+2)); 
    done | tr -d "\n" 
    echo
done





