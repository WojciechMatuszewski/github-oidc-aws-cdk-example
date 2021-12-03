import { App } from "aws-cdk-lib";
import { ApplicationStack } from "../lib/application-stack";

const app = new App();
new ApplicationStack(app, "ApplicationStack", {
  env: {
    region: "eu-west-1",
    // Set by the GitHub Actions. Change accordingly.
    account: process.env.APPLICATION_ACCOUNT_ID
  }
});
