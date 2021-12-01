import * as cdk from "@aws-cdk/core";
import * as iam from "@aws-cdk/aws-iam";

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const gitHubOIDCProvider = new iam.OpenIdConnectProvider(
      this,
      "gitHubOIDCProvider",
      {
        url: "https://token.actions.githubusercontent.com",
        clientIds: ["sts.amazonaws.com"]
      }
    );

    /**
     * Amend those to your needs.
     */
    const yourGitHubUsername = "WojciechMatuszewski";
    const yourGitHubRepoName = "github-oidc-aws-cdk-example";
    const yourGitHubBranchName = "main";

    const applicationDeployerRole = new iam.Role(
      this,
      "applicationDeployerRole",
      {
        assumedBy: new iam.FederatedPrincipal(
          gitHubOIDCProvider.openIdConnectProviderArn,
          {
            StringLike: {
              "token.actions.githubusercontent.com:sub":
                // Notice the `ref:refs`. The `s` in the second `ref` is important!
                `repo:${yourGitHubUsername}/${yourGitHubRepoName}:ref:refs/heads/${yourGitHubBranchName}`
            }
          }
        ),
        inlinePolicies: {}
      }
    );

    new cdk.CfnOutput(this, "applicationDeployerRoleArn", {
      value: applicationDeployerRole.roleArn
    });
  }
}
