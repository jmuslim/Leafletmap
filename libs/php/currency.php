<?php

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

    $apiKey = '331e0a77843041da84f974fcf9322bbc';

	$country =$_REQUEST['country'];
	
	$url = 'https://restcountries.com/v3.1/alpha/' . $country;

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);
	$result=curl_exec($ch);
	curl_close($ch);


	$resultData = json_decode($result, true);
	$currencyData = $resultData[0]['currencies'];
	$currencyCode = array_keys($currencyData)[0];


	$url = 'https://openexchangerates.org/api/latest.json?app_id=' . $apiKey;


	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL, $url);

	$result = curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);	



	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data'] = [$decode['rates']['USD'], $currencyCode, $decode['rates'][$currencyCode]];
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>
