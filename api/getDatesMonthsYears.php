<?php
header("Access-Control-Allow-Origin: *");
$servername = "localhost";
$username = "ankitabhinavback";
$password = "welcome121";
$dbname = "bodyfcyp_nutri";

$main_array = array();

$client2=$_REQUEST["client"];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql_year = "SELECT DISTINCT YEAR(`start`) as `years`  FROM $client2";
$result_year = $conn->query($sql_year);

if ($result_year->num_rows > 0) {
    // output data of each row
    $rows_year = array();
    while($row_year = $result_year->fetch_assoc()) {
      //  echo "MSG: " . $row["msg"]. " - TYPE: " . $row["type"]."<br>";
      $rows_year[] = $row_year;
     
    }
    $main_array[0]=array("data" => $rows_year, "length" =>sizeof($rows_year));
    
   // print json_encode($rows_year);
} else {
    echo "0 results for dates";
}


//slq for months
$sql_month = "SELECT DISTINCT MONTH(`start`) as `months`  FROM $client2";
$result_month = $conn->query($sql_month);

if ($result_month->num_rows > 0) {
    // output data of each row
    $rows_month = array();
    while($row_month = $result_month->fetch_assoc()) {
      //  echo "MSG: " . $row["msg"]. " - TYPE: " . $row["type"]."<br>";
      $rows_month[] = $row_month;
     
    }
   $main_array[1]=array("data" => $rows_month, "length" =>sizeof($rows_month));
    //print json_encode($rows_month);
} else {
    echo "0 results for months";
}

//sql for months ends;

//sql for dates'
//slq for months
$sql_dates = "SELECT DISTINCT DATE(`start`) as `dates` FROM $client2";
$result_dates = $conn->query($sql_dates);

if ($result_dates->num_rows > 0) {
    // output data of each row
    $rows_dates = array();
    while($row_dates = $result_dates->fetch_assoc()) {
      //  echo "MSG: " . $row["msg"]. " - TYPE: " . $row["type"]."<br>";
      $rows_dates[] = $row_dates;
     
    }
   $main_array[2]=array("data" => $rows_dates, "length" =>sizeof($rows_dates));
   // print json_encode($rows_dates);
} else {
    echo "0 results for dates";
}

//sql for months ends;
//sql for dates

print json_encode($main_array);

$conn->close();
?>