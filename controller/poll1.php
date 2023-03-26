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

    

if(isset($post->select))
{
    $selectId = $post->select;

    $sql = "SELECT * FROM polling_unit WHERE polling_unit_id = ?";

    $userdata->uniqId($sql, $selectId);
}

// if(isset($post->trid)){
//     $trid = $post-trid;
//     var_dump($trid);
// }