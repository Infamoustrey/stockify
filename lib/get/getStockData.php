<?php

require_once '../db/quickpdo.php';

$page = $_GET['p'];
$limit = $_GET['l'];
$s = $_GET['s'];
$searchTerm = "%$s%";
$offset = ($page * $limit) - $limit;

$stmt_get_all_symbols = $pdo->prepare("SELECT * FROM stocks WHERE symbol LIKE ? ORDER BY symbol LIMIT ? OFFSET ?");
$stmt_get_all_symbols->execute([$searchTerm, $limit, $offset]);

$temparr = array();
while ($row = $stmt_get_all_symbols->fetch()){
    array_push($temparr, [$row['symbol'], $row['companyName'], $row['stockData']]);
}


echo json_encode($temparr,JSON_PRETTY_PRINT);