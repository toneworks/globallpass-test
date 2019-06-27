<?php
namespace app\controllers;

use yii\rest\Controller;
use app\models\Books;
use yii;

class BooksController extends Controller
{
    public $modelClass = 'common\models\Books';

    public function actionIndex()
    {
        $request = $_SERVER['QUERY_STRING'];
        $request = str_replace("/&", "", $request);
        $request = str_replace("&", "", $request);
        $request = $requestString = rawurldecode($request);
        $filters = json_decode($request, true);

        return Books::getAll($filters);
    }

    public function actionCreate(){
        $request = Yii::$app->request;
        $id = $request->post('id');
        $record = Books::find()->where(['id' => $id])->one();
        if(!$record)
            $record = new Books();

        $record->id = $id;
        $record->title = $request->post('title');;
        $record->description = $request->post('desc');
        $record->authorId = $request->post('authorId');
        $record->pagecount = $request->post('pagecount');
        $record->langId = $request->post('langId');
        $record->genre = $request->post('genre');

        return $record->save();
    }

    /**
     * @inheritdoc
     */
    protected function verbs()
    {
        return [
            'index' => ['GET', 'HEAD'],
        ];
    }
}