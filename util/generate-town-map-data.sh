#!/bin/bash
#  Generate town map data as hex codes from Towne disk.
#  17 maps. 256 bytes per line, 4 lines per map
#  Example
#     ./generate-town-map-data.sh ../c64u4/ULTIMA4B.D64

if [ $# -ne 1 ]; then
  echo "generate-town-map-data.sh <towne-disk>" 1>&2
  exit 1
fi

FILE=$1
BLOCK=$(($2 + 0))
UTIL_DIR=`dirname $0`

for map in {0..16}; do
    xxd -s $(((257+$map*5)*256)) -l 1024 -p -c256 $FILE 
done



