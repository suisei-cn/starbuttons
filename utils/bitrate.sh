#!/bin/bash
TARGET_BITRATE=200

pushd public/assets
HAVE_HI_BIT=0
for i in $(ls | grep -v README.md); do
    BITRATE=$(ffprobe $i 2>&1 | grep bitrate | awk '{print $6}')
    if [ "$BITRATE" -gt "$TARGET_BITRATE" ]; then
        echo "Too high bitrate for '$i' : $BITRATE kbps"
        HAVE_HI_BIT=$((HAVE_HI_BIT + 1))
    fi
done
popd
exit $HAVE_HI_BIT