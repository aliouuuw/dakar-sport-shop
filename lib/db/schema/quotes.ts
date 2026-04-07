import { pgTable, serial, varchar, text, integer, json, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const quoteStatusEnum = pgEnum("quote_status", ["new", "pending", "sent", "accepted", "rejected"]);

export interface QuoteItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  clubName: varchar("club_name", { length: 255 }).notNull(),
  contactName: varchar("contact_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  items: json("items").$type<QuoteItem[]>().notNull().default([]),
  status: quoteStatusEnum("status").notNull().default("new"),
  totalPrice: integer("total_price").notNull().default(0),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Quote = typeof quotes.$inferSelect;
export type NewQuote = typeof quotes.$inferInsert;
