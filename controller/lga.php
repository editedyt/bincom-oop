<?php

spl_autoload_register('autoLoad');

function autoLoad($className)
{
    $path = '../models/';
    $extention = '.php';
    $fullpath = $path . $className . $extention;;

    require_once $fullpath;
}

$userdata = new Data();

$sql = 'SELECT * FROM lga';
$userdata->query($sql);
