<?php

$content=$_REQUEST['content'];
$myfile = fopen("newfile.csv", "w") or die("Unable to open file!");
$txt = $content;
fwrite($myfile, $txt);
fclose($myfile);

?>

