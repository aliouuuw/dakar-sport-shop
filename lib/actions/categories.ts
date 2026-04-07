"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { categories, products } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth-server";
import { eq, asc, count } from "drizzle-orm";
import type { ActionResult } from "./site-settings";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const categorySchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  slug: z.string().min(2).max(100).optional(),
  image: z.string().url("URL d'image invalide").nullable().optional(),
  description: z.string().max(500).nullable().optional(),
  order: z.number().int().min(0).optional(),
});

export type CategoryInput = z.infer<typeof categorySchema>;

export async function getCategories() {
  return db.select().from(categories).orderBy(asc(categories.order));
}

export async function getCategoryBySlug(slug: string) {
  const rows = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getCategoryById(id: number) {
  const rows = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createCategory(data: CategoryInput): Promise<ActionResult<typeof categories.$inferSelect>> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  const parsed = categorySchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  const slug = parsed.data.slug ?? generateSlug(parsed.data.name);

  const existing = await getCategoryBySlug(slug);
  if (existing) {
    return { success: false, error: `Une catégorie avec le slug "${slug}" existe déjà` };
  }

  const [row] = await db.insert(categories).values({
    name: parsed.data.name,
    slug,
    image: parsed.data.image ?? null,
    description: parsed.data.description ?? null,
    order: parsed.data.order ?? 0,
  }).returning();

  return { success: true, data: row };
}

export async function updateCategory(id: number, data: CategoryInput): Promise<ActionResult<typeof categories.$inferSelect>> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  const parsed = categorySchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  const slug = parsed.data.slug ?? generateSlug(parsed.data.name);

  const existingWithSlug = await getCategoryBySlug(slug);
  if (existingWithSlug && existingWithSlug.id !== id) {
    return { success: false, error: `Une catégorie avec le slug "${slug}" existe déjà` };
  }

  const [row] = await db
    .update(categories)
    .set({
      name: parsed.data.name,
      slug,
      image: parsed.data.image ?? null,
      description: parsed.data.description ?? null,
      order: parsed.data.order ?? 0,
      updatedAt: new Date(),
    })
    .where(eq(categories.id, id))
    .returning();

  if (!row) return { success: false, error: "Catégorie introuvable" };
  return { success: true, data: row };
}

export async function deleteCategory(id: number): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  const [productCount] = await db
    .select({ count: count() })
    .from(products)
    .where(eq(products.categoryId, id));

  if (productCount && productCount.count > 0) {
    return {
      success: false,
      error: `Impossible de supprimer : cette catégorie contient ${productCount.count} produit(s)`,
    };
  }

  await db.delete(categories).where(eq(categories.id, id));
  return { success: true, data: undefined };
}

export async function reorderCategories(orderedIds: number[]): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  for (let i = 0; i < orderedIds.length; i++) {
    await db
      .update(categories)
      .set({ order: i, updatedAt: new Date() })
      .where(eq(categories.id, orderedIds[i]));
  }

  return { success: true, data: undefined };
}
