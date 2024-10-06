/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "nextjs-ai-search",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const awsAccessKeyId = new sst.Secret("AWS_ACCESS_KEY_ID");
    const awsSecretAccessKey = new sst.Secret("AWS_SECRET_ACCESS_KEY");
    const openaiApiKey = new sst.Secret("OPENAI_API_KEY");

    const vpc = new sst.aws.Vpc("experimentsVpc");
    const database = new sst.aws.Postgres("experimentsDb", { vpc });

    new sst.aws.Nextjs("WebApp", {
      link: [database, awsAccessKeyId, awsSecretAccessKey, openaiApiKey],
      vpc,
    });
  },
});
