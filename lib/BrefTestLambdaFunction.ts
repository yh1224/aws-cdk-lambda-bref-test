import * as cdk from "aws-cdk-lib";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as logs from "aws-cdk-lib/aws-logs";
import {Construct} from "constructs";
import * as path from "path";

interface BrefLambdaFunctionProps {
    readonly architecture: lambda.Architecture;
    readonly brefLayerArn: string;
    readonly buildImage: string;
    readonly testTable: dynamodb.ITable;
}

export class BrefTestLambdaFunction extends lambda.Function {
    constructor(scope: Construct, id: string, props: BrefLambdaFunctionProps) {
        super(scope, id, {
            architecture: props.architecture,
            code: lambda.Code.fromAsset(path.resolve(__dirname, "../src/TestFunc"), {
                bundling: {
                    image: cdk.DockerImage.fromRegistry(props.buildImage),
                    entrypoint: ["/bin/bash", "-c"],
                    command: [[
                        `cp -a * "${cdk.AssetStaging.BUNDLING_OUTPUT_DIR}"`,
                        `(cd "${cdk.AssetStaging.BUNDLING_OUTPUT_DIR}" && php composer.phar install --no-dev)`,
                    ].join(" && ")],
                },
            }),
            environment: {
                TABLE_NAME: props.testTable.tableName,
            },
            handler: "index.php",
            layers: [lambda.LayerVersion.fromLayerVersionArn(scope, `${id}BrefLayer`, props.brefLayerArn)],
            logRetention: logs.RetentionDays.ONE_DAY,
            maxEventAge: cdk.Duration.minutes(1),
            memorySize: 1024,
            runtime: lambda.Runtime.PROVIDED_AL2,
            timeout: cdk.Duration.seconds(30),
            tracing: lambda.Tracing.ACTIVE,
        });
        props.testTable.grantReadWriteData(this);
    }
}
