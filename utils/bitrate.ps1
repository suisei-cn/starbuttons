$TARGET_BITRATE = 200 # Target bitrate limit
$HAVE_HI_BIT=0
if (Test-Path -Path ..\public\assets){
    Set-Location ..\public\assets
}
else {
    if (Test-Path -Path public\assets) {
        Set-Location public\assets
    }
    else {
        Write-Output "Can't get location. Please switch to root of repository."
    }
}
$files = Get-Item *.mp3
foreach ($file in $files) {
    $null = $filesize = Get-ChildItem | ForEach-Object {[math]::ceiling($file.length / 1kb)}
    if ($filesize -gt '51') {
        # Only check files with size > 50kb
        $info = &"ffprobe" $file.Name 2>&1 | findstr "Duration"
        $BITRATE = ForEach-Object {($info -split "[ ]")[7]}
        if ($BITRATE -gt $TARGET_BITRATE) {
            if ($args[0] -ne "-o") {
                # Arguments:
                #   -o: Only output audio filenames
                Write-Output "Too high bitrate for '$file' : $BITRATE kbps"
                $HAVE_HI_BIT = $HAVE_HI_BIT + 1
            }
            else {
                Write-Output $file
            }
        }
    }
}
Set-Location ..\..
exit $HAVE_HI_BIT