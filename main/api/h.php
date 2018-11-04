<?php
//php opening brace
$val1=$_POST["pass1"];
$val2=$_POST["pass2"];
echo "pass1=$val1";
echo " pass2=$val2";

$servername = "localhost";
$username = "root";
$password = "usbw";
$database="accounts";

$pass=$_GET["pass"];
$email=$_GET["email"];
$dob="NA";
$gender="NA";




//sql starts


$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
echo "Connected successfully";


mysqli_select_db($conn,$database);

echo "database selected"; echo nl2br("\n");

$sql="select * from details where email='$email' and pass='$pass'";
     
    $res=mysqli_query($conn,$sql);
   // $json= array();
    //if(mysqli_num_rows($res))
    //{
    //while($row=mysqli_fetch_row($res))
   // {
        //$jason[]=$row;
        $row=mysqli_fetch_row($res);
	
if($row[1]=="$email"&&$row[2]=="$pass")
{
echo "FOUND";
header("Location: http://myonlinespacecomli.000webhostapp.com/ipenc/dashboard.php");
}				  
else { echo "NOT FOUND";}   
    



//sql ends

//php closing brace

?>