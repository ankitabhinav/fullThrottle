<?php

function send_sms($userID, $userPWD, $recerverNO, $message)
{
if (!function_exists('curl_init')) {
echo "Error Curl library not installed";
return FALSE;
}
$message_urlencode = rawurlencode($message);
if (strlen($message) > 140) {
$message = substr($message, 0, 139);
}

$cookie_file_path = "./cookie.txt";
$temp_file        = "./temporary.txt";
$user_agent       = "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36";

// LOGIN TO WAY2SMS

$url        = "http://site24.way2sms.com/content/Login1.action";
$parameters = array(
"username" => "9709043821",
"password" => "hellowworld",
"button" => "Login"
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, count($parameters));
curl_setopt($ch, CURLOPT_POSTFIELDS, $parameters);
curl_setopt($ch, CURLOPT_HEADER, TRUE);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_file_path);
curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file_path);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
curl_setopt($ch, CURLOPT_USERAGENT, $user_agent);
curl_setopt($ch, CURLOPT_NOBODY, FALSE);
$result = curl_exec($ch);
curl_close($ch);

// SAVE LOGOUT URL

file_put_contents($temp_file, $result);
$result     = "";
$logout_url = "";
$file       = fopen($temp_file, "r");
$line       = "";
$cond       = TRUE;
while ($cond == TRUE) {
$line = fgets($file);
if ($line === FALSE) { // EOF
$cond = FALSE;
} else {
$pos = strpos($line, ' window.location="');
if ($pos === FALSE) {
$line = "";
} else { // URL FOUND
$cond       = FALSE;
$logout_url = substr($line, �25);
$logout_url = substr($logout_url, 0, 21);
}
}
}
fclose($file);

// SAVE SESSION ID

$file = fopen($cookie_file_path, "r");
$line = ��;
$cond = TRUE;
while ($cond == TRUE) {
$line = fgets($file);
if ($line === FALSE) { // EOF
$cond = FALSE;
} else {
$pos = strpos($line, "JSESSIONID");
if ($pos === FALSE) {
$line = "";
} else { // SESSION ID FOUND
$cond = FALSE;
$id   = substr($line, $pos + 15);
}
}
}
fclose($file);

// SEND SMS

$url        = "http://site24.way2sms.com/smstoss.action?Token=" . $id;
$parameters = array(
�button� => "Send SMS",
�mobile� => "9036814583",
�message� => "Jai shree Ram"
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, count($parameters));
curl_setopt($ch, CURLOPT_POSTFIELDS, $parameters);
curl_setopt($ch, CURLOPT_HEADER, TRUE);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_file_path);
curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file_path);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
curl_setopt($ch, CURLOPT_USERAGENT, $user_agent);
curl_setopt($ch, CURLOPT_NOBODY, FALSE);
$result = curl_exec($ch);
curl_close($ch);

// LOGOUT WAY2SMS

$url = "site24.way2sms.com/" . $logout_url;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HEADER, TRUE);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_file_path);
curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file_path);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
curl_setopt($ch, CURLOPT_USERAGENT, $user_agent);
curl_setopt($ch, CURLOPT_NOBODY, FALSE);
$result = curl_exec($ch);
curl_close($ch);

// DELETE TEMP FILES

unlink($cookie_file_path);
unlink($temp_file);

return TRUE;

}
?>