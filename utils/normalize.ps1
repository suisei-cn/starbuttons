if (Test-Path -Path ..\public\assets){
    Set-Location ..\
}
else {
    if (Test-Path -Path public\assets) {
        Set-Location
    }
    else {
        Write-Output "Can't get location. Please switch to root of repository."
    }
}
$FILENAMES = &"utils\bitrate.ps1" -o
Set-Location public\assets
foreach ($i in $FILENAMES){
    Rename-Item $i -NewName 'current.mp3'
    &"ffmpeg" -i current.mp3 -ab 192k -af loudnorm=I=-16:TP=-2:LRA=11 -map_metadata -1 $i
    Remove-Item current.mp3
}
Set-Location ..\..