"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { productVariants } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth-server";
import { eq, asc, and, sql } from "drizzle-orm";
import type { ActionResult } from "./site-settings";

const variantSchema = z.object({
  productId: z.number().int().positive("Produit invalide"),
  sku: z.string().min(1, "Le SKU est requis").max(100),
  size: z.string().max(50).nullable().optional(),
  color: z.string().max(50).nullable().optional(),
  priceOverride: z.number().int().positive().nullable().optional(),
  stock: z.number().int().min(0, "Le stock ne peut pas être négatif").default(0),
  active: z.boolean().default(true),
});

export type VariantInput = z.infer<typeof variantSchema>;

export async function getVariants(productId: number) {
  return db
    .select()
    .from(productVariants)
    .where(eq(productVariants.productId, productId))
    .orderBy(asc(productVariants.size));
}

export async function getVariantById(id: number) {
  const rows = await db.select().from(productVariants).where(eq(productVariants.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createVariant(data: VariantInput): Promise<ActionResult<typeof productVariants.$inferSelect>> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  const parsed = variantSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  const existing = await db
    .select({ id: productVariants.id })
    .from(productVariants)
    .where(eq(productVariants.sku, parsed.data.sku))
    .limit(1);

  if (existing.length > 0) {
    return { success: false, error: `Un variant avec le SKU "${parsed.data.sku}" existe déjà` };
  }

  const [row] = await db.insert(productVariants).values({
    productId: parsed.data.productId,
    sku: parsed.data.sku,
    size: parsed.data.size ?? null,
    color: parsed.data.color ?? null,
    priceOverride: parsed.data.priceOverride ?? null,
    stock: parsed.data.stock,
    active: parsed.data.active,
  }).returning();

  return { success: true, data: row };
}

export async function updateVariant(id: number, data: Partial<VariantInput>): Promise<ActionResult<typeof productVariants.$inferSelect>> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  const parsed = variantSchema.partial().safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  if (parsed.data.sku) {
    const existing = await db
      .select({ id: productVariants.id })
      .from(productVariants)
      .where(and(eq(productVariants.sku, parsed.data.sku), sql`${productVariants.id} != ${id}`))
      .limit(1);
    if (existing.length > 0) {
      return { success: false, error: `Un variant avec le SKU "${parsed.data.sku}" existe déjà` };
    }
  }

  const [row] = await db
    .update(productVariants)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(productVariants.id, id))
    .returning();

  if (!row) return { success: false, error: "Variant introuvable" };
  return { success: true, data: row };
}

export async function deleteVariant(id: number): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  await db.delete(productVariants).where(eq(productVariants.id, id));
  return { success: true, data: undefined };
}
