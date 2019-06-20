<?php
class Db{
    public static function query($query){
        return self::$db->query($query);
    }

    protected static function prepareVariable($var){
        if($var)
            $var="'".$var."'";
        else
            $var='null';
        return $var;
    }

    protected static $db;

    private static $host;
    private static $username;
    private static $passwd;
    private static $dbname;

    //singleton
    protected static $_instance;

    private function __construct() {

    }

    public static function getInstance($host, $username, $passwd, $dbname) {
//        if (self::$_instance === null) {

            self::$host = $host;
            self::$username = $username;
            self::$passwd = $passwd;
            self::$dbname = $dbname;

            self::$db=new mysqli(self::$host, self::$username, self::$passwd, self::$dbname);
            self::$db->set_charset('utf8');

            self::$_instance = new self;
//        }

        return self::$_instance;
    }

    private function __clone() {
    }

    private function __wakeup() {
    }
    //////////////
}
//db::getInstance();
?>