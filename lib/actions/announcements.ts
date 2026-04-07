"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { announcements } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth-server";
import { eq, asc, and, lte, gte, or, isNull } from "drizzle-orm";
import type { ActionResult } from "./site-settings";

const announcementSchema = z.object({
  title: z.string().min(2, "Le titre doit contenir au moins 2 caractères").max(255),
  body: z.string().min(1, "Le contenu est requis"),
  type: z.enum(["banner", "popup", "info"]),
  active: z.boolean().default(true),
  startsAt: z.coerce.date().nullable().optional(),
  endsAt: z.coerce.date().nullable().optional(),
  order: z.number().int().min(0).default(0),
});

export type AnnouncementInput = z.infer<typeof announcementSchema>;

export async function getAnnouncements() {
  return db.select().from(announcements).orderBy(asc(announcements.order));
}

export async function getActiveAnnouncements() {
  const now = new Date();
  const rows = await db
    .select()
    .from(announcements)
    .where(
      and(
        eq(announcements.active, true),
        or(isNull(announcements.startsAt), lte(announcements.startsAt, now)),
        or(isNull(announcements.endsAt), gte(announcements.endsAt, now))
      )
    )
    .orderBy(asc(announcements.order));
  return rows;
}

export async function getAnnouncementById(id: number) {
  const rows = await db.select().from(announcements).where(eq(announcements.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createAnnouncement(data: AnnouncementInput): Promise<ActionResult<typeof announcements.$inferSelect>> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  const parsed = announcementSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  const [row] = await db.insert(announcements).values({
    title: parsed.data.title,
    body: parsed.data.body,
    type: parsed.data.type,
    active: parsed.data.active,
    startsAt: parsed.data.startsAt ?? null,
    endsAt: parsed.data.endsAt ?? null,
    order: parsed.data.order,
  }).returning();

  return { success: true, data: row };
}

export async function updateAnnouncement(id: number, data: Partial<AnnouncementInput>): Promise<ActionResult<typeof announcements.$inferSelect>> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  const parsed = announcementSchema.partial().safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  const [row] = await db
    .update(announcements)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(announcements.id, id))
    .returning();

  if (!row) return { success: false, error: "Annonce introuvable" };
  return { success: true, data: row };
}

export async function deleteAnnouncement(id: number): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  await db.delete(announcements).where(eq(announcements.id, id));
  return { success: true, data: undefined };
}

export async function reorderAnnouncements(orderedIds: number[]): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  for (let i = 0; i < orderedIds.length; i++) {
    await db
      .update(announcements)
      .set({ order: i, updatedAt: new Date() })
      .where(eq(announcements.id, orderedIds[i]));
  }

  return { success: true, data: undefined };
}
