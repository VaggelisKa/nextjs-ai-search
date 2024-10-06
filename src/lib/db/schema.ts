import { generateId } from "ai";
import {
  index,
  pgTableCreator,
  text,
  timestamp,
  varchar,
  vector,
} from "drizzle-orm/pg-core";

const pgTable = pgTableCreator((name) => `nextAiSearch_${name}`);

export const documents = pgTable(
  "documents",
  {
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => generateId(191)),
    content: text("content").notNull(),
    embedding: vector("embedding", { dimensions: 1024 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    embeddingIndex: index("embedding_index").using(
      "hnsw",
      table.embedding.op("vector_cosine_ops"),
    ),
  }),
);
