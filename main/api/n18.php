<?php

$contents=file_get_contents('http://www.news18.com/');

if (preg_match_all('/title="([^"]+)"/', $contents, $m)) {
      
 //($m);
} else {
   echo " unable to fetch data from Network 18";
}

$arr_size=count($m[1]);// gtting no of elemnts in array 


for($i=5;$i<$arr_size;$i++)
{
	$data=$m[1][$i];
	$index=$i-2;
	echo nl2br("\n$index. $data");
}





?> 