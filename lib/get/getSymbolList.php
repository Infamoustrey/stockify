<?php

require_once '../db/quickpdo.php';

$stmt_get_all_symbols = $pdo->query('SELECT * FROM stocks');

$temparr = array();
while ($row = $stmt_get_all_symbols->fetch()){
    array_push($temparr, [$row['symbol'], $row['companyName']]);
}


echo json_encode($temparr,JSON_PRETTY_PRINT);