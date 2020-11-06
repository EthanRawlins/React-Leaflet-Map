<?php
    $db = null;

    try
    {    $username = "feelthes_jared";
        $password = "ullrich";
        $host = "cpanel-host2061.hostmonster.com";
        $database = "feelthes_map_addresses";
        
        $db = new PDO("mysql:host=$host;dbname=$database", $username, $password);

        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch (PDOException $e) {
        echo 'Error: '. $e->getMessage();
        die();
    }

    function getActiveClients() {
        $sql = "SELECT ID, FirstName, LastName, PhoneNumber, StreetAddress, UnitNumber, City, StateProvince, ZipCode FROM contacts WHERE List Name='Active Client (when a person has an active policy)'";
        $rs = $db->query($sql);

        if (!$rs) {
            echo "An SQL error occured.\n";
            exit;
        }

        $rows = array();
        while($r = $rs->fetch(PDO::FETCH_ASSOC)) {
            $rows[] = $r;
        }
        $db = NULL;
        
        return $rows;
    }
?>