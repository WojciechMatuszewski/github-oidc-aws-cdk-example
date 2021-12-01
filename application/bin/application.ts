#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { ApplicationStack } from "../lib/application-stack";

const app = new cdk.App();
new ApplicationStack(app, "ApplicationStack", {
  synthesizer: new cdk.DefaultStackSynthesizer({
    qualifier: "blogpost"
  })
});
