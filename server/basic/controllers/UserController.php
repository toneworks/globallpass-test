<?php
namespace app\controllers;

use yii\rest\Controller;
use app\models\User;

class UserController extends Controller
{
    public function actionIndex()
    {
        return User::getAll();
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