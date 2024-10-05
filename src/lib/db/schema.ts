import {
  doublePrecision,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  content: text("content"),
  embedding: doublePrecision("embedding"),
  createdAt: timestamp("created_at").defaultNow(),
});
