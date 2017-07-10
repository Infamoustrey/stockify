<?php
require_once('../class.stockMarketAPI.php');
require_once '../db/quickpdo.php';

$StockMarketAPI = new StockMarketAPI;
$StockMarketAPI->symbol = "";

$stmt_get_all_symbols = $pdo->query('SELECT * FROM stocks WHERE datediff(lastUpdated, CURDATE()) > 1 OR lastUpdated IS NULL ');
$stmt_updateSymbol = $pdo->prepare('UPDATE stocks SET stockData = ?, lastUpdated = ? WHERE id = ?');

while ($row = $stmt_get_all_symbols->fetch()){
    $StockMarketAPI->symbol = $row['symbol'];
    echo '\n'.$row['symbol'].' - Success: '.$stmt_updateSymbol->execute([json_encode($StockMarketAPI->getData()), date('Y-m-d H:i:s'), $row['id']]);
}