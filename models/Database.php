<?php

class Database
{
    private $host = 'localhost';
    private $dbName = 'bincomphptest';
    private $user = 'root';
    private $password = '';
    public function database()
    {
        $dsn = 'mysql::host=' .$this->host. ';dbname=' .$this->dbName;

        try {
            return $db = new PDO($dsn, $this->user, $this->password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
        } catch (PDOExecption $e) {
            die($e->getMessage());
        }
    }
}
