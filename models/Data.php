<?php
    require_once 'Database.php';
    class Data extends Database
    {
        public function uniqId($query, $data){
            $DB = $this->database();
            $stm = $DB->prepare($query);
            // $stm->bindValue(':data', $data);
            $stm->execute([$data]);
            $results = $stm->fetchAll();
            if($results){
                $data = Json_encode(["success"=>"get Successful", "pollMsg"=>$results]);

                exit($data);
            }
            $stm->closeCursor();
        }
        
        public function query($query){
            $DB = $this->database();
            $stm = $DB->prepare($query);
            $stm->execute();
            $results = $stm->fetchAll();
            if($results){
                $data = Json_encode(["success"=>"get Successful", "lgaMsg"=>$results]);

                exit($data);
            } else {
                $data = Json_encode(["Failed"=>"get Successful", "lgaMsg"=>"Failed"]);
            }
            $stm->closeCursor();
        }
    }
