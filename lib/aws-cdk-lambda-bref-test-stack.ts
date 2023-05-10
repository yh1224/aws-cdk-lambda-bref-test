import * as cdk from "aws-cdk-lib";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import {Construct} from "constructs";
import {BrefTestLambdaFunction} from "./BrefTestLambdaFunction";

export class AwsCdkLambdaBrefTestStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const testTable = new dynamodb.Table(this, "BrefTestTable", {
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            partitionKey: {name: "PK", type: dynamodb.AttributeType.STRING},
            sortKey: {name: "SK", type: dynamodb.AttributeType.STRING},
            billingMode: dynamodb.BillingMode.PROVISIONED,
            readCapacity: 100,
            writeCapacity: 1,
        });

        // Bref https://bref.sh/docs/runtimes/
        // https://runtimes.bref.sh/?region=ap-northeast-1

        // x86_64, Bref 2.0.2, PHP 8.0.28
        new BrefTestLambdaFunction(this, "X8664-Bref202-Php80-TestFunction", {
            architecture: lambda.Architecture.X86_64,
            brefLayerArn: "arn:aws:lambda:ap-northeast-1:534081306603:layer:php-80:42",
            buildImage: "bref/php-80",
            testTable,
        });

        // x86_64, Bref 2.0.2, PHP 8.1.17
        new BrefTestLambdaFunction(this, "X8664-Bref202-Php81-TestFunction", {
            architecture: lambda.Architecture.X86_64,
            brefLayerArn: "arn:aws:lambda:ap-northeast-1:534081306603:layer:php-81:41",
            buildImage: "bref/php-81",
            testTable,
        });

        // x86_64, Bref 2.0.2, PHP 8.2.4
        new BrefTestLambdaFunction(this, "X8664-Bref202-Php82-TestFunction", {
            architecture: lambda.Architecture.X86_64,
            brefLayerArn: "arn:aws:lambda:ap-northeast-1:534081306603:layer:php-82:31",
            buildImage: "bref/php-82",
            testTable,
        });

        // x86_64, Bref 2.0.4, PHP 8.0.28
        new BrefTestLambdaFunction(this, "X8664-Bref204-Php80-TestFunction", {
            architecture: lambda.Architecture.X86_64,
            brefLayerArn: "arn:aws:lambda:ap-northeast-1:534081306603:layer:php-80:44",
            buildImage: "bref/php-80",
            testTable,
        });

        // x86_64, Bref 2.0.4, PHP 8.1.17
        new BrefTestLambdaFunction(this, "X8664-Bref204-Php81-TestFunction", {
            architecture: lambda.Architecture.X86_64,
            brefLayerArn: "arn:aws:lambda:ap-northeast-1:534081306603:layer:php-81:43",
            buildImage: "bref/php-81",
            testTable,
        });

        // x86_64, Bref 2.0.4, PHP 8.2.5
        new BrefTestLambdaFunction(this, "X8664-Bref204-Php82-TestFunction", {
            architecture: lambda.Architecture.X86_64,
            brefLayerArn: "arn:aws:lambda:ap-northeast-1:534081306603:layer:php-82:33",
            buildImage: "bref/php-82",
            testTable,
        });


        // arm64, Bref 2.0.2, PHP 8.0.
        new BrefTestLambdaFunction(this, "Arm64-Bref202-Php80-TestFunction", {
            architecture: lambda.Architecture.ARM_64,
            brefLayerArn: "arn:aws:lambda:ap-northeast-1:534081306603:layer:arm-php-80:43",
            buildImage: "bref/php-80",
            testTable,
        });

        // arm64, Bref 2.0.2, PHP 8.1.
        new BrefTestLambdaFunction(this, "Arm64-Bref202-Php81-TestFunction", {
            architecture: lambda.Architecture.ARM_64,
            brefLayerArn: "arn:aws:lambda:ap-northeast-1:534081306603:layer:arm-php-81:22",
            buildImage: "bref/php-81",
            testTable,
        });

        // arm64, Bref 2.0.2, PHP 8.2.
        new BrefTestLambdaFunction(this, "Arm64-Bref202-Php82-TestFunction", {
            architecture: lambda.Architecture.ARM_64,
            brefLayerArn: "arn:aws:lambda:ap-northeast-1:534081306603:layer:arm-php-82:19",
            buildImage: "bref/php-82",
            testTable,
        });

        // arm64, Bref 2.0.4, PHP 8.0.
        new BrefTestLambdaFunction(this, "Arm64-Bref204-Php80-TestFunction", {
            architecture: lambda.Architecture.ARM_64,
            brefLayerArn: "arn:aws:lambda:ap-northeast-1:534081306603:layer:arm-php-80:45",
            buildImage: "bref/php-80",
            testTable,
        });

        // arm64, Bref 2.0.4, PHP 8.1.
        new BrefTestLambdaFunction(this, "Arm64-Bref204-Php81-TestFunction", {
            architecture: lambda.Architecture.ARM_64,
            brefLayerArn: "arn:aws:lambda:ap-northeast-1:534081306603:layer:arm-php-81:24",
            buildImage: "bref/php-81",
            testTable,
        });

        // arm64, Bref 2.0.4, PHP 8.2.
        new BrefTestLambdaFunction(this, "Arm64-Bref204-Php82-TestFunction", {
            architecture: lambda.Architecture.ARM_64,
            brefLayerArn: "arn:aws:lambda:ap-northeast-1:534081306603:layer:arm-php-82:21",
            buildImage: "bref/php-82",
            testTable,
        });
    }
}
