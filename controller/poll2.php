<?php
$post = json_decode(file_get_contents("php://input"));

spl_autoload_register('autoLoad');

function autoLoad($className)
{
    $path = '../models/';
    $extention = '.php';
    $fullpath = $path . $className . $extention;;

    require_once $fullpath;
}

$userdata = new Data();

    

if(isset($post->id))
{
    $trid = $post->id;
    $trid = array($trid);

    $sql = "SELECT * FROM `announced_pu_results` WHERE `polling_unit_uniqueid` IN (".implode(',',$trid).")";


    $userdata->query($sql);
}