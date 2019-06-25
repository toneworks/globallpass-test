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
    private $pageCount;
    private $langId;
    private $genre;

    public static function getAll()
    {
        return self::find()->all();
    }

    public static function tableName()
    {
        return '{{books}}';
    }
}