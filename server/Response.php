<?php
class Response
{
    private static $sended = false;

    private static $showComment = true;

    private static $comment;

    public static function status($code){
        self::$body["status"]=$code;
    }

    public static function comment($comment){
        self::$comment=$comment;
    }

    public static function add($name, $value){
        self::$body[$name]=$value;
    }

    public static function send(){
        if(self::$comment&&self::$showComment)
            self::$body["comment"]=self::$comment;
        if(!self::$sended) {
            echo json_encode(self::$body);
            self::$sended = true;
        }
    }

    private static $body=array();
    //singleton
    protected static $_instance;

    private function __construct()
    {
    }

    public static function getInstance()
    {
        if (self::$_instance === null) {
            self::$_instance = new self;
        }

        return self::$_instance;
    }

    private function __clone()
    {
    }

    private function __wakeup()
    {
    }
}
Response::getInstance();
?>