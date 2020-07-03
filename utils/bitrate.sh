#!/bin/bash
# Arguments:
#   -o: Only output audio filenames
TARGET_BITRATE=200

cd public/assets
HAVE_HI_BIT=0
for i in $(ls | grep -v README.md); do
    BITRATE=$(ffprobe $i 2>&1 | grep Duration | awk '{print $6}')
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