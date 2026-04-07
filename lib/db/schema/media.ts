import { pgTable, serial, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  alt: varchar("alt", { length: 255 }),
  filename: varchar("filename", { length: 255 }).notNull(),
  mimeType: varchar("mime_type", { length: 100 }).notNull(),
  size: integer("size").notNull(),
  width: integer("width"),
  height: integer("height"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Media = typeof media.$inferSelect;
export type NewMedia = typeof media.$inferInsert;
