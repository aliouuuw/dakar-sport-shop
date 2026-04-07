"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { products, categories, productVariants } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth-server";
import { eq, asc, desc, and, sql } from "drizzle-orm";
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

const productSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(255),
  slug: z.string().min(2).max(255).optional(),
  description: z.string().nullable().optional(),
  price: z.number().int().positive("Le prix doit être supérieur à 0"),
  compareAtPrice: z.number().int().positive().nullable().optional(),
  images: z.array(z.string().url()).default([]),
  categoryId: z.number().int().positive("Catégorie invalide"),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
  stock: z.number().int().min(0).default(0),
});

export type ProductInput = z.infer<typeof productSchema>;

export interface ProductFilters {
  categoryId?: number;
  active?: boolean;
  featured?: boolean;
  limit?: number;
  offset?: number;
}

export async function getProducts(filters: ProductFilters = {}) {
  const { categoryId, active, featured, limit = 50, offset = 0 } = filters;

  const conditions = [];
  if (categoryId !== undefined) conditions.push(eq(products.categoryId, categoryId));
  if (active !== undefined) conditions.push(eq(products.active, active));
  if (featured !== undefined) conditions.push(eq(products.featured, featured));

  const rows = await db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      description: products.description,
      price: products.price,
      compareAtPrice: products.compareAtPrice,
      images: products.images,
      categoryId: products.categoryId,
      categoryName: categories.name,
      categorySlug: categories.slug,
      featured: products.featured,
      active: products.active,
      stock: products.stock,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(products.createdAt))
    .limit(limit)
    .offset(offset);

  return rows;
}

export async function getProductBySlug(slug: string) {
  const rows = await db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      description: products.description,
      price: products.price,
      compareAtPrice: products.compareAtPrice,
      images: products.images,
      categoryId: products.categoryId,
      categoryName: categories.name,
      categorySlug: categories.slug,
      featured: products.featured,
      active: products.active,
      stock: products.stock,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(products.slug, slug))
    .limit(1);

  return rows[0] ?? null;
}

export async function getProductById(id: number) {
  const rows = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createProduct(data: ProductInput): Promise<ActionResult<typeof products.$inferSelect>> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  const parsed = productSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  const slug = parsed.data.slug ?? generateSlug(parsed.data.name);

  const existing = await db.select({ id: products.id }).from(products).where(eq(products.slug, slug)).limit(1);
  if (existing.length > 0) {
    return { success: false, error: `Un produit avec le slug "${slug}" existe déjà` };
  }

  const [row] = await db.insert(products).values({
    name: parsed.data.name,
    slug,
    description: parsed.data.description ?? null,
    price: parsed.data.price,
    compareAtPrice: parsed.data.compareAtPrice ?? null,
    images: parsed.data.images,
    categoryId: parsed.data.categoryId,
    featured: parsed.data.featured,
    active: parsed.data.active,
    stock: parsed.data.stock,
  }).returning();

  return { success: true, data: row };
}

export async function updateProduct(id: number, data: Partial<ProductInput>): Promise<ActionResult<typeof products.$inferSelect>> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  const parsed = productSchema.partial().safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  const updateData: Record<string, unknown> = { ...parsed.data, updatedAt: new Date() };

  if (parsed.data.name && !parsed.data.slug) {
    updateData.slug = generateSlug(parsed.data.name);
  }

  if (updateData.slug) {
    const existing = await db
      .select({ id: products.id })
      .from(products)
      .where(and(eq(products.slug, updateData.slug as string), sql`${products.id} != ${id}`))
      .limit(1);
    if (existing.length > 0) {
      return { success: false, error: `Un produit avec le slug "${updateData.slug}" existe déjà` };
    }
  }

  const [row] = await db
    .update(products)
    .set(updateData as Partial<typeof products.$inferInsert>)
    .where(eq(products.id, id))
    .returning();

  if (!row) return { success: false, error: "Produit introuvable" };
  return { success: true, data: row };
}

export async function deleteProduct(id: number): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  await db.delete(products).where(eq(products.id, id));
  return { success: true, data: undefined };
}

export async function toggleProductActive(id: number): Promise<ActionResult<{ active: boolean }>> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  const current = await getProductById(id);
  if (!current) return { success: false, error: "Produit introuvable" };

  const [row] = await db
    .update(products)
    .set({ active: !current.active, updatedAt: new Date() })
    .where(eq(products.id, id))
    .returning({ active: products.active });

  return { success: true, data: { active: row.active } };
}

export async function getProductCountByCategory(): Promise<Record<number, number>> {
  const rows = await db
    .select({ categoryId: products.categoryId, count: sql<number>`count(*)::int` })
    .from(products)
    .groupBy(products.categoryId);
  
  return rows.reduce((acc, row) => {
    if (row.categoryId !== null) {
      acc[row.categoryId] = row.count;
    }
    return acc;
  }, {} as Record<number, number>);
}

export async function duplicateProduct(id: number): Promise<ActionResult<typeof products.$inferSelect>> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  const source = await getProductById(id);
  if (!source) return { success: false, error: "Produit introuvable" };

  const baseName = `${source.name} (copie)`;
  const baseSlug = generateSlug(baseName);

  let slug = baseSlug;
  let attempt = 0;
  while (true) {
    const existing = await db.select({ id: products.id }).from(products).where(eq(products.slug, slug)).limit(1);
    if (existing.length === 0) break;
    attempt++;
    slug = `${baseSlug}-${attempt}`;
  }

  const [newProduct] = await db.insert(products).values({
    name: baseName,
    slug,
    description: source.description,
    price: source.price,
    compareAtPrice: source.compareAtPrice,
    images: source.images,
    categoryId: source.categoryId,
    featured: false,
    active: false,
    stock: source.stock,
  }).returning();

  const variants = await db.select().from(productVariants).where(eq(productVariants.productId, id));
  for (const variant of variants) {
    const newSku = `${variant.sku}-copie-${Date.now()}`;
    await db.insert(productVariants).values({
      productId: newProduct.id,
      sku: newSku,
      size: variant.size,
      color: variant.color,
      priceOverride: variant.priceOverride,
      stock: variant.stock,
      active: variant.active,
    });
  }

  return { success: true, data: newProduct };
}
