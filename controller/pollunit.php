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
$uniq_id = 19;

$sql = 'SELECT * FROM `announced_pu_results` WHERE `polling_unit_uniqueid` = ?';

$userdata->uniqId($sql, $uniq_id);