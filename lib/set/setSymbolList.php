<?php

require_once '../db/quickpdo.php';

$uri = "http://www.nasdaq.com/screening/companies-by-name.aspx?letter=0&exchange=nasdaq&render=download";

$csv = array();

$lines = file($uri, FILE_IGNORE_NEW_LINES);

$arr = array();

$stmt_insert_if_new_stock = $pdo->prepare('INSERT INTO stocks (symbol, companyName) VALUES (?, ?)');

foreach (array_slice($lines,1) as $key => $value){
    $temp = array_slice(explode(',',$value), 0, 2);
    echo $temp[0].' - Success:'.$stmt_insert_if_new_stock->execute([str_replace('"', '', $temp[0]),str_replace('"', '', $temp[1])]);
}


