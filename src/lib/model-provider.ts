import "server-only";

import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";
import { createOpenAI } from "@ai-sdk/openai";
import { Resource } from "sst";

export const bedrock = createAmazonBedrock({
  region: "eu-central-1",
  accessKeyId: Resource.AWS_ACCESS_KEY_ID.value,
  secretAccessKey: Resource.AWS_SECRET_ACCESS_KEY.value,
});

export const bedrockEmbeddingModel = bedrock.textEmbeddingModel(
  "amazon.titan-embed-text-v1",
);

const openai = createOpenAI({
  apiKey: Resource.OPENAI_API_KEY.value,
});

export const openaiEmbeddingModel = openai.embedding("text-embedding-ada-002");
