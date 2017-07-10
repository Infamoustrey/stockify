<?php

require_once '../db/quickpdo.php';

$page = $_GET['p'];
$limit = $_GET['l'];

$offset = $page * $limit;

$stmt_get_all_symbols = $pdo->prepare("SELECT * FROM stocks ORDER BY symbol  LIMIT ?, ?");
$stmt_get_all_symbols->execute([$offset,$limit]);

$temparr = array();
while ($row = $stmt_get_all_symbols->fetch()){
    array_push($temparr, [$row['symbol'], $row['companyName'], $row['stockData']]);
}


echo json_encode($temparr,JSON_PRETTY_PRINT);