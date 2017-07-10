<?php

$uri = "http://www.nasdaq.com/screening/companies-by-name.aspx?letter=0&exchange=nasdaq&render=download";

$csv = array();

$lines = file($uri, FILE_IGNORE_NEW_LINES);

foreach (array_slice($lines,1) as $key => $value){
    $csv[$key] = str_getcsv(implode(',',array_slice(explode(',',$value), 0, 2)));
}

echo json_encode($csv, JSON_PRETTY_PRINT);