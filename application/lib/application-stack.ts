import * as cdk from "@aws-cdk/core";
// import * as sqs from '@aws-cdk/aws-sqs';

export class ApplicationStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
  }
}
