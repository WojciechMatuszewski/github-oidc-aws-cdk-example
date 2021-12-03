import { aws_iam, CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

export class InfrastructureStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const gitHubOIDCProvider = new aws_iam.OpenIdConnectProvider(
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

    const applicationDeployerRole = new aws_iam.Role(
      this,
      "applicationDeployerRole",
      {
        assumedBy: new aws_iam.WebIdentityPrincipal(
          gitHubOIDCProvider.openIdConnectProviderArn,
          {
            StringLike: {
              "token.actions.githubusercontent.com:sub":
                // Notice the `ref:refs`. The `s` in the second `ref` is important!
                `repo:${yourGitHubUsername}/${yourGitHubRepoName}:ref:refs/heads/${yourGitHubBranchName}`
            }
          }
        ),
        // Has to be defined, otherwise the deployment fails.
        inlinePolicies: {}
      }
    );

    new CfnOutput(this, "applicationDeployerRoleArn", {
      value: applicationDeployerRole.roleArn
    });
  }
}
