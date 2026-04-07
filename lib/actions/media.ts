"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { media } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth-server";
import { eq, desc, like, or } from "drizzle-orm";
import type { ActionResult } from "./site-settings";

const createMediaSchema = z.object({
  url: z.string().url("URL invalide"),
  alt: z.string().max(255).nullable().optional(),
  filename: z.string().min(1, "Le nom de fichier est requis").max(255),
  mimeType: z.string().min(1, "Le type MIME est requis").max(100),
  size: z.number().int().positive("La taille du fichier doit être positive"),
  width: z.number().int().positive().nullable().optional(),
  height: z.number().int().positive().nullable().optional(),
});

export type CreateMediaInput = z.infer<typeof createMediaSchema>;

export interface MediaFilters {
  search?: string;
  limit?: number;
  offset?: number;
}

export async function getMedia(filters: MediaFilters = {}) {
  const { search, limit = 50, offset = 0 } = filters;

  const query = db.select().from(media);

  if (search) {
    return query
      .where(or(like(media.filename, `%${search}%`), like(media.alt, `%${search}%`)))
      .orderBy(desc(media.createdAt))
      .limit(limit)
      .offset(offset);
  }

  return query.orderBy(desc(media.createdAt)).limit(limit).offset(offset);
}

export async function getMediaById(id: number) {
  const rows = await db.select().from(media).where(eq(media.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createMediaRecord(data: CreateMediaInput): Promise<ActionResult<typeof media.$inferSelect>> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  const parsed = createMediaSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  const [row] = await db.insert(media).values({
    url: parsed.data.url,
    alt: parsed.data.alt ?? null,
    filename: parsed.data.filename,
    mimeType: parsed.data.mimeType,
    size: parsed.data.size,
    width: parsed.data.width ?? null,
    height: parsed.data.height ?? null,
  }).returning();

  return { success: true, data: row };
}

export async function deleteMedia(id: number): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  await db.delete(media).where(eq(media.id, id));
  return { success: true, data: undefined };
}
