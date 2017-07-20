<?php

require '../account/userMustBeLoggedIn.php';
require '../db/quickpdo.php';

$input_json = file_get_contents('php://input');

$userid = $_SESSION['userID'];

$stmt_retrieve_user_pref = $pdo->prepare('SELECT json FROM userprefs WHERE userid = ?');
$stmt_retrieve_user_pref->execute([$userid]);

if($stmt_retrieve_user_pref->rowCount() != 0){
    $stmt_set_user_pref = $pdo->prepare('UPDATE userprefs SET json = ? WHERE userid = ?');
    $stmt_set_user_pref->execute([$input_json, $userid]);
}else{
    $stmt_set_user_pref = $pdo->prepare('INSERT INTO userprefs (json, userid) VALUES (?,?)');
    $stmt_set_user_pref->execute([$input_json, $userid]);
}

if($stmt_set_user_pref->rowCount() == 1){
    echo 'success';
}else{
    echo 'failure';
}


