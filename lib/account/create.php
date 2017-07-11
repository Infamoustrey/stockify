<?php

session_start();
session_regenerate_id(true);

require_once '../db/quickpdo.php';

$input_email = trim($_POST['email']);
$input_username = trim($_POST['username']);
$input_Password = trim($_POST['password']);



if($input_email==''||$input_Password==''||$input_username==''||strlen($input_username)<=1||strlen($input_Password)<=1||strlen($input_email)<=1){
    header("HTTP/1.1 400 Bad Request");
    echo 'Bad Input.';
    exit;
}
date_default_timezone_set('America/Chicago');
$time = date("Y-m-d H:i:s");

$stmt_does_account_exist = $pdo->prepare('SELECT email,username FROM users WHERE email = ? OR username = ?');
$stmt_create_account_user = $pdo->prepare("INSERT INTO users (created, email, username, hash) VALUES (?,?,?,?)");


$stmt_does_account_exist->execute([$input_email, $input_username]);

if($stmt_does_account_exist->rowCount() > 0){
    header("HTTP/1.1 400 Bad Request");
    echo 'Account already exists.';
    exit;
}else{
    $pass_hash = password_hash($input_Password, PASSWORD_BCRYPT);

    if($stmt_create_account_user->execute([$time, $input_email, $input_username, $pass_hash])){
        echo 'Account Created Successfully.';
    }else{
        echo 'Account Created Failure.';
    }


}
