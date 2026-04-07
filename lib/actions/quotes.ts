"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { quotes } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth-server";
import { eq, desc } from "drizzle-orm";
import { logActivity } from "./activity-log";
import type { ActionResult } from "./site-settings";
import type { QuoteItem } from "@/lib/db/schema/quotes";

const quoteItemSchema = z.object({
  productId: z.number().int().positive(),
  productName: z.string().min(1),
  quantity: z.number().int().positive("La quantité doit être supérieure à 0"),
  unitPrice: z.number().int().positive("Le prix doit être supérieur à 0"),
});

const createQuoteSchema = z.object({
  clubName: z.string().min(2, "Le nom du club doit contenir au moins 2 caractères").max(255),
  contactName: z.string().min(2, "Le nom du contact doit contenir au moins 2 caractères").max(255),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().max(50).nullable().optional(),
  items: z.array(quoteItemSchema).min(1, "Au moins un article est requis"),
  notes: z.string().nullable().optional(),
});

export type CreateQuoteInput = z.infer<typeof createQuoteSchema>;

const quoteStatusValues = ["new", "pending", "sent", "accepted", "rejected"] as const;

export interface QuoteFilters {
  status?: typeof quoteStatusValues[number];
  limit?: number;
  offset?: number;
}

export async function getQuotes(filters: QuoteFilters = {}) {
  const { limit = 50, offset = 0 } = filters;
  return db
    .select()
    .from(quotes)
    .orderBy(desc(quotes.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function getQuoteById(id: number) {
  const rows = await db.select().from(quotes).where(eq(quotes.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createQuote(data: CreateQuoteInput): Promise<ActionResult<typeof quotes.$inferSelect>> {
  const parsed = createQuoteSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  const totalPrice = parsed.data.items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const [row] = await db.insert(quotes).values({
    clubName: parsed.data.clubName,
    contactName: parsed.data.contactName,
    email: parsed.data.email,
    phone: parsed.data.phone ?? null,
    items: parsed.data.items as QuoteItem[],
    totalPrice,
    notes: parsed.data.notes ?? null,
  }).returning();

  await logActivity(null, "create", "quote", row.id, { clubName: row.clubName });

  return { success: true, data: row };
}

export async function updateQuoteStatus(
  id: number,
  status: typeof quoteStatusValues[number]
): Promise<ActionResult<typeof quotes.$inferSelect>> {
  try {
    const session = await requireAdmin();
    const userId = session.user.id;

    const [row] = await db
      .update(quotes)
      .set({ status, updatedAt: new Date() })
      .where(eq(quotes.id, id))
      .returning();

    if (!row) return { success: false, error: "Devis introuvable" };

    await logActivity(userId, "update_status", "quote", id, { status });

    return { success: true, data: row };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Erreur inconnue";
    return { success: false, error: msg };
  }
}

export async function deleteQuote(id: number): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  await db.delete(quotes).where(eq(quotes.id, id));
  await logActivity(null, "delete", "quote", id, null);
  return { success: true, data: undefined };
}
