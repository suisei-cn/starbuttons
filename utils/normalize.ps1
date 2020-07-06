$FILENAMES = &"utils/bitrate.ps1" -o
Set-Location public\assets
foreach ($i in $FILENAMES){
    Rename-Item $i -NewName 'current.mp3'
    &"ffmpeg" -i current.mp3 -ab 192k -map_metadata -1 $i
    Remove-Item current.mp3
}
Set-Location ..\..