<?php
declare(strict_types=1);

require_once __DIR__ . "/vendor/autoload.php";

use Aws\DynamoDb\DynamoDbClient;
use Aws\DynamoDb\Marshaler;

function dynamodbTest(string $tableName): void
{
    $ddbClient = new DynamoDbClient([
        'region' => 'ap-northeast-1',
        'version' => '2012-08-10',
        'http' => [
            'connect_timeout' => 5,
            'read_timeout' => 5,
        ],
    ]);
    $marshaler = new Marshaler();
    $ddbClient->query([
        'TableName' => $tableName,
        'KeyConditionExpression' => '#pk = :pk AND #sk >= :sk',
        'ExpressionAttributeNames' => ['#pk' => 'PK', '#sk' => 'SK'],
        'ExpressionAttributeValues' => $marshaler->marshalItem([
            ':pk' => 'test',
            ':sk' => 'test',
        ]),
    ]);
}
