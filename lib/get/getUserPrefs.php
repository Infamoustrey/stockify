<?php

require '../account/userMustBeLoggedIn.php';
require '../db/quickpdo.php';

$userid = $_SESSION['userID'];

$stmt_retrieve_user_pref = $pdo->prepare('SELECT json FROM userprefs WHERE userid = ?');
$stmt_retrieve_user_pref->execute([$userid]);

$json = $stmt_retrieve_user_pref->fetchColumn();

echo $json;

