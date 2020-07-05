New-Variable -Name TARGET_BITRATE -Value 200 -Option Constant # Target bitrate limit
$HAVE_HI_BIT=0
Get-Location | findstr 'utils'
if ($? -eq "True"){
    Set-Location ..\public\assets
}
else {
    $null = Test-Path public\assets
    if ($? -eq "True") {
        Set-Location public\assets
    }
    else {
        Write-Output "Can't get location."
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