# The infrastructure stack

This stack defines _GitHub OIDC IAM provider_ and a "deployer role" – the IAM role that will be used to deploy the "application" stack.

## Q&A

**Q**: Why bother creating two separate stacks?
**A**: I prefer to have separation of concerns, even at the CICD level. Depending on your setup, "application" developers could never be aware of this stack existence in the first place – this stack could be "platform team" concern.
