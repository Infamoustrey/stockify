<?php
require_once('../yahooAPI/ApiClient.php');
require_once('../yahooAPI/HttpClient.php');

$client = new \Scheb\YahooFinanceApi\ApiClient();


$data = $client->getQuotes("YHOO");
echo json_encode($data, JSON_PRETTY_PRINT);