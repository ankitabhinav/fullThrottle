<?php
 header("Access-Control-Allow-Origin: *");
 $response = http_get("https://backrest.in/React/api/locate/weather.html");
 var_dump($response);
 ?>