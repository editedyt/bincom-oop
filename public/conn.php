<?php 
    $host= 'localhost';
    $port=3306;
    $db = 'id20389338_bincom';
    $user = 'id20389338_bincomdev';
    $password = '$hQ6NyY-tAJmfjp3';


    $conn = new mysqli($host, $user, $password, $db);

    mysql_select_db($db) or die ('No database found');

    echo @mysql_ping() ? 'true' : 'false';

    
?>