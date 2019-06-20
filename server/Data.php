<?php
require_once 'DataDb.php';

class Data
{
    public static function getData(){
        $books = DataDb::getBooks();
        $authors = DataDb::getAuthors();
        $langs = DataDb::getLangs();

        if(gettype($books)=='array'&&gettype($authors)=='array'&&gettype($langs)=='array')
            return Array(
                'books' => DataDb::getBooks(),
                'authors' => DataDb::getAuthors(),
                'langs' => DataDb::getLangs()
            );
        else
            return false;
    }

    public static function addOrUpdateBook($id, $title, $authorId, $description, $pageCount, $langId, $genre){
        return DataDb::addOrUpdateBook($id, $title, $authorId, $description, $pageCount, $langId, $genre);
    }

    public static function addAuthor($id, $name){
        return DataDB::addAuthor($id, $name);
    }

    public static function changeAuthor($id, $newValue){
        return DataDB::changeAuthor($id, $newValue);
    }

    public static function addLang($id, $name){
        return DataDb::addLang($id, $name);
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

Data::getInstance();