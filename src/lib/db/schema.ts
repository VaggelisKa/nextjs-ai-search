import {
  pgTableCreator,
  serial,
  text,
  timestamp,
  vector,
} from "drizzle-orm/pg-core";

const pgTable = pgTableCreator((name) => `nextAiSearch_${name}`);

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  content: text("content"),
  embedding: vector("embedding", { dimensions: 3 }),
  createdAt: timestamp("created_at").defaultNow(),
});
