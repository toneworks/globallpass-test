<?php
namespace app\models;

use yii\db\ActiveRecord;

class Authors extends ActiveRecord
{
    const STATUS_INACTIVE = 0;
    const STATUS_ACTIVE = 1;

    private $id;

    private $name;

    public static function getAll()
    {
        return self::find()->all();
    }

    public static function tableName()
    {
        return '{{authors}}';
    }
}