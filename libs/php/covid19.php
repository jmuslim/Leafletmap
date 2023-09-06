<?php

	// remove for production

    $data = [
        'collection' => 'RapidAPI'
      ];

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	$url='https://covid-193.p.rapidapi.com/statistics?country=' .$_REQUEST['country']; 


	$ch = curl_init();

	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "X-RapidAPI-Host: covid-193.p.rapidapi.com",
		"X-RapidAPI-Key: 70486122e3msh0f57c19d1e1f64ap1dedccjsn25dd8e18f9cf",
        // 'Content-Type: application/json'
      ]);


	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data'] = $decode;
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>
