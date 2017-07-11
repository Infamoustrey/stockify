<?php

session_start();

require_once '../db/quickpdo.php';

$stmt_bring_offline = $pdo->prepare('UPDATE users SET online = 0 WHERE ID = ?');
$stmt_bring_offline->execute([$_SESSION['userID']]);
if($stmt_bring_offline->rowCount() == 1){
    session_destroy();
    unset($_SESSION['userID']);
    unset($_SESSION['loggedIn']);

    echo 'You have been logged out.';
}else{

    session_destroy();
    unset($_SESSION['userID']);
    unset($_SESSION['loggedIn']);

    echo 'You have been logged out.';

}
