<?php
 
    // remove for production
 
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);
 
    $executionStartTime = microtime(true);
 
    $result = file_get_contents("countryBorders.geo.json");
 
    function compare($a, $b) {
        if ($a["coordinates"] == $b["coordinates"]) return 0;
        return ($a["coordinates"] < $b["coordinates"]) ? -1 : 1;
    }
 
    $decode = json_decode($result,true);

    $countries1 = [];
    for ($i = 0; $i < count($decode['features']); $i++) {
        array_push($countries1,$decode['features'][$i]['geometry']);
    };


 
    usort($countries1, "compare");


    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output['data'] = $countries1;
    
    header('Content-Type: application/json; charset=UTF-8');
 
    echo json_encode($output); 
 
?>