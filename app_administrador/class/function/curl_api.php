<?php
    require __DIR__.'./../../vendor/autoload.php';
	
	$dotenv         = Dotenv\Dotenv::createImmutable(__DIR__.'./../../');
	$dotenv->load();

    $api            = $_ENV['API_URL'];
    $aut            = $_ENV['API_KEY'];

    function get_curl($ext){
        global $api;
        global $aut;
        $urlAPI                     = $api.'/'.$ext;
        $ch                         = curl_init();
        curl_setopt($ch, CURLOPT_URL, $urlAPI);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 0);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 0);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
        curl_setopt($ch, CURLOPT_HTTPHEADER, array("Accept: application/json", "Authorization: Basic ".$aut, "Content-Type: application/json"));
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $result                     = curl_exec($ch);
        curl_close($ch);
        $result                     = json_decode($result, TRUE);
        return $result;
    }

    function post_curl($ext, $data){
        global $api;
        global $aut;
        $urlAPI                     = $api.'/'.$ext;
        $ch                         = curl_init();
        curl_setopt($ch, CURLOPT_URL, $urlAPI);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST"); 
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array("Accept: application/json", "Authorization: Basic ".$aut, "Content-Type: application/json"));
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $result                     = curl_exec($ch);
        curl_close($ch);
        return $result;
    }

    function put_curl($ext, $data){
        global $api;
        global $aut;
        $urlAPI                     = $api.'/'.$ext;
        $ch                         = curl_init();
        curl_setopt($ch, CURLOPT_URL, $urlAPI);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT"); 
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array("Accept: application/json", "Authorization: Basic ".$aut, "Content-Type: application/json"));
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $result                     = curl_exec($ch);
        curl_close($ch);
        return $result;
    }

    function delete_curl($ext, $data){
        global $api;
        global $aut;
        $urlAPI                     = $api.'/'.$ext;
        $ch                         = curl_init();
        curl_setopt($ch, CURLOPT_URL, $urlAPI);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE"); 
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array("Accept: application/json", "Authorization: Basic ".$aut, "Content-Type: application/json"));
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $result                     = curl_exec($ch);
        curl_close($ch);
        return $result;
    }
?>