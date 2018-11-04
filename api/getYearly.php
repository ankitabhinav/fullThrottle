<?php
header("Access-Control-Allow-Origin: *");
$servername = "localhost";
$username = "ankitabhinavback";
$password = "welcome121";
$dbname = "bodyfcyp_nutri";

$year_val=$_REQUEST["year"];

$client2=$_REQUEST["client"];
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT SUM(difference) as total_hours FROM
(
 SELECT TIMESTAMPDIFF(HOUR, `start`, `stop`) 
           as `difference` 
           FROM $client2 
           WHERE YEAR(`start`) = '$year_val'
           GROUP BY difference
    )t1";
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