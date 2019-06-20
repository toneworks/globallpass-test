<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

require_once 'Response.php';
require_once 'DataController.php';

$request = $_SERVER['QUERY_STRING'];
$request = str_replace("/&", "", $request);
$request = str_replace("&", "", $request);
$request = $requestString = rawurldecode($request); //удаляет %22
$request = json_decode($request, true);

if(array_key_exists('method', $request))
    DataController::handleRequest($request);
else
    Response::status(400);
Response::send();