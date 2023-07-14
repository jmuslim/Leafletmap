<?php

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$api_key= '17215bab532f416fb56b5d34e70f108b';

	$executionStartTime = microtime(true);

	$url = 'https://api.opencagedata.com/geocode/v1/json?key='.$api_key.'&q='.$_REQUEST['countryName'].'&pretty=1';

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
