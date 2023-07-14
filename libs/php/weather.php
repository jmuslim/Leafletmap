<?php

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$api_key= 'a3f2a8ef5d2e3b444c2c8685d417e449';

	$executionStartTime = microtime(true);

    $url='https://api.openweathermap.org/data/2.5/weather?&units=metric&lat='.$_REQUEST['latitude'].'&lon='.$_REQUEST['longitude'].'&appid='.$api_key;

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

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