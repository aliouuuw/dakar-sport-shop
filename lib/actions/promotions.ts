"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { promotions } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth-server";
import { eq, desc } from "drizzle-orm";
import type { ActionResult } from "./site-settings";

const promotionSchema = z.object({
  title: z.string().min(2, "Le titre doit contenir au moins 2 caractères").max(255),
  description: z.string().nullable().optional(),
  discountType: z.enum(["percentage", "fixed"]),
  discountValue: z.number().int().positive("La valeur de remise doit être supérieure à 0"),
  code: z.string().max(50).nullable().optional(),
  active: z.boolean().default(true),
  startsAt: z.coerce.date(),
  endsAt: z.coerce.date(),
}).refine((data) => data.endsAt > data.startsAt, {
  message: "La date de fin doit être postérieure à la date de début",
  path: ["endsAt"],
}).refine((data) => {
  if (data.discountType === "percentage") {
    return data.discountValue >= 1 && data.discountValue <= 100;
  }
  return true;
}, {
  message: "Le pourcentage de remise doit être entre 1 et 100",
  path: ["discountValue"],
});

export type PromotionInput = z.infer<typeof promotionSchema>;

export async function getPromotions() {
  return db.select().from(promotions).orderBy(desc(promotions.createdAt));
}

export async function getPromotionById(id: number) {
  const rows = await db.select().from(promotions).where(eq(promotions.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function getActivePromotions() {
  const now = new Date();
  const rows = await db.select().from(promotions);
  return rows.filter(
    (p) => p.active && p.startsAt <= now && p.endsAt >= now
  );
}

export async function createPromotion(data: PromotionInput): Promise<ActionResult<typeof promotions.$inferSelect>> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  const parsed = promotionSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  const [row] = await db.insert(promotions).values({
    title: parsed.data.title,
    description: parsed.data.description ?? null,
    discountType: parsed.data.discountType,
    discountValue: parsed.data.discountValue,
    code: parsed.data.code ?? null,
    active: parsed.data.active,
    startsAt: parsed.data.startsAt,
    endsAt: parsed.data.endsAt,
  }).returning();

  return { success: true, data: row };
}

export async function updatePromotion(id: number, data: Partial<PromotionInput>): Promise<ActionResult<typeof promotions.$inferSelect>> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  const parsed = promotionSchema.partial().safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  const [row] = await db
    .update(promotions)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(promotions.id, id))
    .returning();

  if (!row) return { success: false, error: "Promotion introuvable" };
  return { success: true, data: row };
}

export async function deletePromotion(id: number): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  await db.delete(promotions).where(eq(promotions.id, id));
  return { success: true, data: undefined };
}

export async function togglePromotionActive(id: number): Promise<ActionResult<{ active: boolean }>> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  const current = await getPromotionById(id);
  if (!current) return { success: false, error: "Promotion introuvable" };

  const [row] = await db
    .update(promotions)
    .set({ active: !current.active, updatedAt: new Date() })
    .where(eq(promotions.id, id))
    .returning({ active: promotions.active });

  return { success: true, data: { active: row.active } };
}
