<?php
namespace app\controllers;

use yii\filters\AccessControl;
use yii\filters\VerbFilter;
use yii\rest\Controller;
use app\models\Langs;
use yii\web\Request;
use yii;

class LangsController extends Controller
{
    public $modelClass = 'common\models\Langs';


    public function actionIndex()
    {
        return Langs::getAll();
    }

    /**
     * @inheritdoc
     */

    public function actionCreate(){
        $request = Yii::$app->request;
        $id = $request->post('id');
        $record = Langs::find()->where(['id' => $id])->one();
        if(!$record)
            $record = new Langs();
        $name = $request->post('name');

        $record->id = $id;
        $record->name = $name;

        return $record->save();
    }

    protected function verbs()
    {
        return [
            'index' => ['GET', 'HEAD'],
        ];
    }
}