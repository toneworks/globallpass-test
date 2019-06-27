<?php
namespace app\models;

use yii\db\ActiveRecord;

class Books extends ActiveRecord
{
    const STATUS_INACTIVE = 0;
    const STATUS_ACTIVE = 1;

    private $id;
    private $title;
    private $authorId;
    private $description;
    private $pagecount;
    private $langId;
    private $genre;

    private static function sqlALFilter($requestAuthorFilter, $key){ //для автором и языков - у них одинаковая структура
        $res=['or'];
        for($i=0; $i<count($requestAuthorFilter); $i++)
            array_push($res, [$key => $requestAuthorFilter[$i]['id']]);
        return $res;
    }

    private static function sqlPageCountFilter($requestPageCountFilter){
        $res=['and'];
        if(array_key_exists('min', $requestPageCountFilter)&&$requestPageCountFilter['min']!=null)
            array_push($res, ['>=', 'pagecount', (int)$requestPageCountFilter['min']]);
        if(array_key_exists('max', $requestPageCountFilter)&&$requestPageCountFilter['max']!=null)
            array_push($res, ['<=', 'pagecount', (int)$requestPageCountFilter['max']]);
        return $res;
    }

    private static function sqlGenreFilter($requestGenreFilter){
        $res=['or'];
        for($i=0; $i<count($requestGenreFilter); $i++)
            array_push($res, ['=', 'genre', $requestGenreFilter[$i]['name']]);
        return $res;
    }

    public static function getAll($filters)
    {
        $find = self::find();
        if($filters) {
            $find = $find->where(['regexp', 'title', $filters['title']?$filters['title']:'.*']);
            $find->andWhere(self::sqlALFilter($filters['authors'], 'authorId'));
            $find->andWhere(self::sqlALFilter($filters['langs'], 'langId'));
            $find->andWhere(self::sqlPageCountFilter($filters['pageCount']));
            $find->andWhere(self::sqlGenreFilter($filters['genre']));
        }
        return $find->all();
    }

    public static function tableName()
    {
        return '{{books}}';
    }
}