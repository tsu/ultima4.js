#!/bin/bash
#  Generate 16x16 table with all tiles and hex codes
#  Example, go in directory where tile-xx.png files are, and then run this script
#x
#    ../../ultima4.js/util/generate-tile-map-md.sh

HEX="0 1 2 3 4 5 6 7 8 9 A B C D E F";

# Header row
echo "# Map tiles"
echo
echo -n "|   "
for s in $HEX; do
  echo -n "| **_${s}** "
done
echo "|"
echo "|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|"

# Loop 16 rows
for r in $HEX; do
    echo -n "| **${r}_** "
    (for s in tile-$r?.png; do 
        echo -n $s; 
    done) | \
    sed 's/tile-\(..\).png/<img src="img\/tile-\1.png" width="32" height="32"\/>|/g; s/^/|/g' | tr -d '\t' 
done
