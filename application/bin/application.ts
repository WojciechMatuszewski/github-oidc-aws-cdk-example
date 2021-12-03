import { App } from "aws-cdk-lib";
import { ApplicationStack } from "../lib/application-stack";

const app = new App();
new ApplicationStack(app, "ApplicationStack");
