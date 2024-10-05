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
    const vpc = new sst.aws.Vpc("experimentsVpc");
    const database = new sst.aws.Postgres("experimentsDb", { vpc });

    new sst.aws.Nextjs("WebApp", {
      link: [database],
      vpc,
    });
  },
});
