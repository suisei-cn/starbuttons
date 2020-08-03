#!/bin/bash
# Arguments:
#   -o: Only output audio filenames

# Only check files with size > 50kb
FILTER_FILE_SIZE=50k
# Target bitrate limit
TARGET_BITRATE=200

cd public/assets
HAVE_HI_BIT=0
for i in $(find . -size +$FILTER_FILE_SIZE | grep -v README.md); do
    BITRATE=$(($(ffprobe -v error -show_entries format=bit_rate -i $i | sed -n "2p" | awk -F '[=]' '{print $2}') / 1024))
    if [ "$BITRATE" -gt "$TARGET_BITRATE" ]; then
        if [ "$1" != "-o" ]; then
            echo "Too high bitrate for '$i' : $BITRATE kbps"
            HAVE_HI_BIT=$((HAVE_HI_BIT + 1))
        else
            echo $i
        fi
    fi
done
cd ../..
exit $HAVE_HI_BIT
