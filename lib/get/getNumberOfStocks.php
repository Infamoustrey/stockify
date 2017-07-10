<?php

require_once '../db/quickpdo.php';

$page = $_GET['p'];
$limit = $_GET['l'];

$offset = $page * $limit;

$stmt_get_stock_count = $pdo->query("SELECT Count(*) FROM stocks;");
$rowCount = $stmt_get_stock_count->fetchColumn();
echo $rowCount;