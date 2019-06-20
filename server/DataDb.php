<?php
require_once 'Db.php';

class DataDb extends Db
{
    public static function getBooks(){
        $resDb = self::$db->query("select id, title, authorId, description, pageCount, langId, genre from books");
        if($resDb)
            $resDb = $resDb->fetch_all();
        else {
            Response::add('sqlError', self::$db->error);
            return false;
        }
        $res = Array();
        for($i=0; $i<count($resDb); $i++)
            array_push($res,
                Array(
                    'id' => $resDb[$i][0],
                    'title' => $resDb[$i][1],
                    'authorId' => $resDb[$i][2],
                    'desc' => $resDb[$i][3],
                    'pageCount' => $resDb[$i][4],
                    'langId' => $resDb[$i][5],
                    'genre' => $resDb[$i][6]
                )
            );
        return $res;
    }

    public static function getAuthors(){
        $resDb = self::$db->query("select id, name from authors");
        if($resDb)
            $resDb = $resDb->fetch_all();
        else
            return false;
        $res = Array();
        for($i=0; $i<count($resDb); $i++)
            array_push($res,
                Array(
                    'id' => $resDb[$i][0],
                    'name' => $resDb[$i][1]
                ));
        return $res;
    }

    public static function getLangs(){
        $resDb = self::$db->query("select id, name from langs");
        if($resDb)
            $resDb = $resDb->fetch_all();
        else
            return false;
        $res = Array();
        for($i=0; $i<count($resDb); $i++)
            array_push($res,
                Array(
                    'id' => $resDb[$i][0],
                    'name' => $resDb[$i][1]
                ));
        return $res;
    }

    public static function addOrUpdateBook($id, $title, $authorId, $description, $pageCount, $langId, $genre){
        $res = self::$db->query("insert into books(id, title, authorId, description, pageCount, langId, genre) 
            values('$id', '$title', '$authorId', '$description', '$pageCount', '$langId', '$genre') 
            on duplicate key update title='$title', authorId='$authorId', description='$description', pageCount='$pageCount',
            langId='$langId', genre='$genre'");
        if($res)
            return true;
        Response::add('sqlError', self::$db->error);
        return false;
    }

    public static function addAuthor($id, $name){
        $res = self::$db->query("insert into authors(id, name) values('$id', '$name')");
        if($res)
            return true;
        Response::add('sqlError', self::$db->error);
        return false;
    }

    public static function changeAuthor($id, $newValue){
        $res = self::$db->query("update authors set name='$newValue' where id='$id'");
        if($res)
            return true;
        Response::add('sqlError', self::$db->error);
        return false;
    }

    public static function addLang($id, $name){
        $res = self::$db->query("insert into langs values('$id', '$name')");
        if($res)
            return true;
        Response::add('sqlError', self::$db->error);
        return false;
    }
}

DataDb::getInstance('localhost', 'root', '1', 'globalpas-test');