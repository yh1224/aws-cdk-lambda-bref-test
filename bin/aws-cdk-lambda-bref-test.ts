#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import {AwsCdkLambdaBrefTestStack} from "../lib/aws-cdk-lambda-bref-test-stack";

const app = new cdk.App();
new AwsCdkLambdaBrefTestStack(app, "AwsCdkLambdaBrefTestStack", {});
