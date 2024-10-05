import {
  doublePrecision,
  pgTableCreator,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

const pgTable = pgTableCreator((name) => `nextAiSearch_${name}`);

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  content: text("content"),
  embedding: doublePrecision("embedding"),
  createdAt: timestamp("created_at").defaultNow(),
});
