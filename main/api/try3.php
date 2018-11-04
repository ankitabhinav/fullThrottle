<?php
$url = 'http://www.ndtv.com';
$file = "hell.txt";
$src = fopen($url, 'r');
$dest = fopen($file, 'w');
echo stream_copy_to_stream($src, $dest) . " bytes copied.\n";
?> 