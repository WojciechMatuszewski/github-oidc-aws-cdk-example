import { InfrastructureStack } from "../lib/infrastructure-stack";
import { App, DefaultStackSynthesizer } from "aws-cdk-lib";

const app = new App();
new InfrastructureStack(app, "InfrastructureStack", {
  env: {
    region: "eu-west-1"
  },
  synthesizer: new DefaultStackSynthesizer({
    // Specified at the bootstrap time. Checkout package.json "bootstrap" script.
    qualifier: "infra"
  })
});
