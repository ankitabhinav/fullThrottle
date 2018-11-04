<?php

$contents=file_get_contents('http://www.ndtv.com/');

if (preg_match_all('/title="([^"]+)"/', $contents, $m)) {
      
 //var_dump($m);
} else {
   echo " unable to fetch data from NDTV";
}

$arr_size=count($m[1]);// gtting no of elemnts in array 


for($i=3;$i<10;$i++)
{
	$data=$m[1][$i];
	$index=$i-2;

	echo nl2br("<li>".$data."</li>");
}










?> 