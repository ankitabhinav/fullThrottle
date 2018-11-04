<?php
$myfile = fopen("hell.txt", "r") or die("Unable to open file!");
//$contents=fread($myfile,filesize("ss.txt"));
$size=filesize("hell.txt");
echo "File Size:$size";


fclose($myfile);
?> 