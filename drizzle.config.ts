import { defineConfig } from "drizzle-kit";
import { Resource } from "sst";

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  dialect: "postgresql",
  driver: "aws-data-api",
  dbCredentials: {
    database: Resource.experimentsDb.database,
    secretArn: Resource.experimentsDb.secretArn,
    resourceArn: Resource.experimentsDb.clusterArn,
  },
  verbose: true,
  strict: true,
  out: "./migrations",
});
