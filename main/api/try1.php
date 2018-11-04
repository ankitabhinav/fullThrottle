<?php
$myfile = fopen("hell.txt", "r") or die("Unable to open file!");
$contents=fread($myfile,filesize("hell.txt"));

if (preg_match_all('/title="([^"]+)"/', $contents, $m)) {
    print $m[1];   
  var_dump($m);
} else {
   //preg_match returns the number of matches found, 
   //so if here didn't match pattern
}

fclose($myfile);
?> 