<?php

session_start();
session_regenerate_id(true);

$input_email = $_POST['email'];
$input_password = $_POST['password'];

require_once '../db/quickpdo.php';

$stmt_get_user_id = $pdo->prepare('SELECT * FROM users WHERE email = ?');
$stmt_get_user_id->execute([$input_email]);

$result = $stmt_get_user_id->fetch();
$userID = $result['ID'];

if(password_verify($input_password, $result['hash'])){
    $_SESSION['userID'] = "$userID";
    $_SESSION['loggedIn'] = 'true';
    echo 'Successfully Logged In.';
}else{
    header("HTTP/1.1 400 Bad Request");
    echo 'Login Failure.';
    exit;
}



