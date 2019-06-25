<?php
namespace app\controllers;

use yii\rest\Controller;
use app\models\Authors;
use yii;

class AuthorsController extends Controller
{
    public $modelClass = 'common\models\Authors';


    public function actionIndex()
    {
        return Authors::getAll();
    }

    /**
     * @inheritdoc
     */

    public function actionCreate(){
        $request = Yii::$app->request;
        $id = $request->post('id');
        $record = Authors::find()->where(['id' => $id])->one();
        if(!$record)
            $record = new Authors();
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