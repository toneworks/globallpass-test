<?php
require_once 'Response.php';
require_once 'Data.php';

class DataController
{
    private static function checkKeys($keysArray, $request){
        for($i=0; $i<count($keysArray); $i++)
            if(!array_key_exists($keysArray[$i], $request)) {
                Response::status(400);
                Response::add("keysError", "in key ".$keysArray[$i]);
                Response::add('request', $request);
                return false;
            }
        return true;
    }

    public static function handleRequest($request){
        switch($request['method']){
            case 'getData':
                if($res = Data::getData()) {
                    Response::add('data', $res);
                    Response::status(200);
                    break;
                }
                Response::status(400);
                break;
            case 'addOrUpdateBook':
                if(self::checkKeys(['id', 'title', 'authorId', 'description', 'pageCount', 'langId', 'genre'], $request)) {
                    $id=$request['id'];
                    $title = $request['title'];
                    $authorId = $request['authorId'];
                    $description = $request['description'];
                    $pageCount = $request['pageCount'];
                    $langId = $request['langId'];
                    $genre = $request['genre'];
                    if (Data::addOrUpdateBook($id, $title, $authorId, $description, $pageCount, $langId, $genre)) {
                        Response::status(200);
                        break;
                    }
                }
                Response::status(400);
                break;
            case 'addAuthor':
                if(self::checkKeys(['id', 'name'], $request)) {
                    $id = $request['id'];
                    $name = $request['name'];
                    if (Data::addAuthor($id, $name)) {
                        Response::status(200);
                        break;
                    }
                }

                Response::status(400);
                break;
            case 'changeAuthor':
                if(self::checkKeys(['id', 'newValue'], $request)) {
                    $id=$request['id'];
                    $newValue=$request['newValue'];
                    if (Data::changeAuthor($id, $newValue)) {
                        Response::status(200);
                        break;
                    }
                }
                Response::status(400);
                break;
            case 'addLang':
                if(self::checkKeys(['id', 'name'], $request)){
                    $id=$request['id'];
                    $name=$request['name'];
                    if(Data::addLang($id, $name)){
                        Response::status(200);
                        break;
                    }
                }
                Response::status(400);
                break;
            default:
                Response::status(400);
        }
    }

    //Singleton
    private static $_instance;
    public static function getInstance() {
        if (self::$_instance === null) {
            self::$_instance = new self;
        }

        return self::$_instance;
    }
    private function __construct(){}
    private function __clone(){}
}

DataController::getInstance();