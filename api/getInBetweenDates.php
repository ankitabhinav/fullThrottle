<?php
header("Access-Control-Allow-Origin: *");
$servername = "localhost";
$username = "ankitabhinavback";
$password = "welcome121";
$dbname = "bodyfcyp_nutri";

$start_date=$_REQUEST['start_date'];
$end_date=$_REQUEST['end_date'];
$client2=$_REQUEST["client"];



// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "Select DATE(`start`) as 'start_date',TIME(`start`) as 'start_time',DATE(`stop`) as 'stop_date',TIME(`stop`) as 'stop_time', TIME_TO_SEC(TIMEDIFF(`stop`, `start`))/3600 as hours 
from $client2
WHERE DATE(`start`)>='$start_date' AND DATE(`stop`)<='$end_date'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    $rows = array();
    while($row = $result->fetch_assoc()) {
      //  echo "MSG: " . $row["msg"]. " - TYPE: " . $row["type"]."<br>";
      $rows[] = $row;
     
    }
    print json_encode($rows);
} else {
    echo "0 results";
}
//echo $row;
$conn->close();
?>