<?php

require '../account/userMustBeLoggedIn.php';
require '../db/quickpdo.php';

$input_json = file_get_contents('php://input');

$userid = $_SESSION['userID'];

$stmt_set_user_pref = $pdo->prepare('UPDATE userprefs SET json = ? WHERE userid = ?');
$stmt_set_user_pref->execute([$input_json, $userid]);

if($stmt_set_user_pref->rowCount() == 1){
    echo 'success';
}else{
    echo 'failure';
}

