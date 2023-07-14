<?php
 
    // remove for production
 
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);
 
    $executionStartTime = microtime(true);
 
    $result = file_get_contents("countryBorders.geo.json");
 
    function compare($a, $b) {
        if ($a["name"] == $b["name"]) return 0;
        return ($a["name"] < $b["name"]) ? -1 : 1;
    }
 
    $decode = json_decode($result,true);

    $countries = [];
    for ($i = 0; $i < count($decode['features']); $i++) {
        array_push($countries,$decode['features'][$i]['properties']);
    };

 
    usort($countries, "compare");


    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output['data'] = $countries;
    
    header('Content-Type: application/json; charset=UTF-8');
 
    echo json_encode($output); 
 
?>