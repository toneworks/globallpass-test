<?php

return [
    'class' => 'yii\db\Connection',
    'dsn' => 'mysql:host=localhost;dbname=globalpas-test',
//    'dsn' => 'pgsql:host=localhost;port=5432;dbname=globalpas;',
//    'username' => 'globalpas',
    'username' => 'root',
    'password' => '1',
    'charset' => 'utf8',

    // Schema cache options (for production environment)
    //'enableSchemaCache' => true,
    //'schemaCacheDuration' => 60,
    //'schemaCache' => 'cache',
];
