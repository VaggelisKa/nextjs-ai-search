"use server";

import { embed, embedMany } from "ai";
import { desc, gt, sql } from "drizzle-orm";
import { db } from "./db/db";
import { documents } from "./db/schema";
import { bedrockEmbeddingModel, openaiEmbeddingModel } from "./model-provider";

export async function searchAction(formData: FormData) {
  let content = formData.get("search");

  if (!content || typeof content !== "string") {
    throw new Error("Content is required");
  }

  let { embedding } = await embed({
    model: bedrockEmbeddingModel,
    value: content,
  });

  let similarity = sql<number>`1 - (embedding <=> ${JSON.stringify(embedding)}::vector)`;

  let similarDocuments = await db
    .select({ content: documents.content, similarity })
    .from(documents)
    .where(gt(similarity, 0.7))
    .orderBy((t) => desc(t.similarity))
    .limit(10);

  return similarDocuments;
}

function generateChunks(input: string) {
  return input
    .trim()
    .split(".")
    .map((i) => i.replaceAll("\n", ""))
    .filter((i) => i !== "");
}

export async function addAction(formData: FormData) {
  "use server";

  let content = formData.get("add");

  if (!content || typeof content !== "string") {
    throw new Error("Content is required");
  }

  let chunks = generateChunks(content);

  let { embeddings } = await embedMany({
    model: openaiEmbeddingModel,
    values: chunks,
  });

  await db.insert(documents).values(
    embeddings.map((embedding, idx) => ({
      content: chunks[idx],
      embedding: sql`${JSON.stringify(embedding)}::vector`, // Something is off with RDS casting,
    })),
  );
}
