<?php

$id_to_delete=$_POST["id"];

$servername = "localhost";
$username = "ankitabhinavback";
$password = "welcome121";
$dbname = "bodyfcyp_nutri";


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

// sql to delete a record
$sql = "DELETE FROM `chat` WHERE `id`=$id_to_delete";

if ($conn->query($sql) === TRUE) {
    echo "done";
} else {
    echo "Error deleting record: " . $conn->error;
}

$conn->close();
?>