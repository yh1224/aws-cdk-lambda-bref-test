<?php
declare(strict_types=1);

require_once __DIR__ . "/vendor/autoload.php";
require_once __DIR__ . "/dynamodb.php";

use Bref\Context\Context;

return function ($event, Context $context): int {
    echo PHP_VERSION . "\n";

    $tableName = getenv("TABLE_NAME");
    $start = microtime(true);
    for ($i = 0; $i < 100; $i++) {
        echo ".";
        dynamodbTest($tableName);
    }
    $end = microtime(true);
    $elapsed = $end - $start;
    echo "\nElapsed: $elapsed sec.\n";

    return 0;
};
