"use server";

import { embed } from "ai";
import { desc, gt, sql } from "drizzle-orm";
import { db } from "./db/db";
import { documents } from "./db/schema";
import { openaiEmbeddingModel } from "./model-provider";

export async function searchAction(formData: FormData) {
  let content = formData.get("search");

  if (!content || typeof content !== "string") {
    throw new Error("Content is required");
  }

  let { embedding } = await embed({
    model: openaiEmbeddingModel,
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
