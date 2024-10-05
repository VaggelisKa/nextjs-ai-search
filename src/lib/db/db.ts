import "server-only";

import { Resource } from "sst";
import { drizzle } from "drizzle-orm/aws-data-api/pg";
import { RDSDataClient } from "@aws-sdk/client-rds-data";

export const db = drizzle(
  new RDSDataClient({
    region: "eu-central-1",
  }),
  {
    database: Resource.experimentsDb.database,
    secretArn: Resource.experimentsDb.secretArn,
    resourceArn: Resource.experimentsDb.clusterArn,
  }
);
