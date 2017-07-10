<?php
require_once('../class.stockMarketAPI.php');

$StockMarketAPI = new StockMarketAPI;
$StockMarketAPI->symbol = "".$_GET['symbol'];

echo json_encode($StockMarketAPI->getData());