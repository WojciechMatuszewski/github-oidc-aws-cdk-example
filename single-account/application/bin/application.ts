import { App, DefaultStackSynthesizer } from "aws-cdk-lib";
import { ApplicationStack } from "../lib/application-stack";

const app = new App();
new ApplicationStack(app, "ApplicationStack", {
  env: {
    region: "eu-west-1"
  },
  synthesizer: new DefaultStackSynthesizer({
    // Specified at the bootstrap time. Checkout package.json "bootstrap" script.
    qualifier: "application"
  })
});
