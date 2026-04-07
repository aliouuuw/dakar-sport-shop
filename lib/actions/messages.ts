"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth-server";
import { eq, desc, and, isNull, count } from "drizzle-orm";
import type { ActionResult } from "./site-settings";

const createMessageSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(255),
  email: z.string().email("Adresse email invalide").max(255),
  phone: z.string().max(50).nullable().optional(),
  subject: z.string().min(2, "Le sujet doit contenir au moins 2 caractères").max(255),
  body: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

export type CreateMessageInput = z.infer<typeof createMessageSchema>;

export interface MessageFilters {
  read?: boolean;
  archived?: boolean;
  limit?: number;
  offset?: number;
}

export async function getMessages(filters: MessageFilters = {}) {
  const { read, archived = false, limit = 50, offset = 0 } = filters;

  const conditions = [];
  if (read !== undefined) conditions.push(eq(messages.read, read));
  if (!archived) conditions.push(isNull(messages.archivedAt));

  return db
    .select()
    .from(messages)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(messages.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function getMessageById(id: number) {
  const rows = await db.select().from(messages).where(eq(messages.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function getUnreadCount(): Promise<number> {
  const [result] = await db
    .select({ count: count() })
    .from(messages)
    .where(and(eq(messages.read, false), isNull(messages.archivedAt)));
  return result?.count ?? 0;
}

export async function createMessage(data: CreateMessageInput): Promise<ActionResult<typeof messages.$inferSelect>> {
  const parsed = createMessageSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  const [row] = await db.insert(messages).values({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone ?? null,
    subject: parsed.data.subject,
    body: parsed.data.body,
  }).returning();

  return { success: true, data: row };
}

export async function markAsRead(id: number): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  await db.update(messages).set({ read: true }).where(eq(messages.id, id));
  return { success: true, data: undefined };
}

export async function markAsUnread(id: number): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  await db.update(messages).set({ read: false }).where(eq(messages.id, id));
  return { success: true, data: undefined };
}

export async function archiveMessage(id: number): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  await db.update(messages).set({ archivedAt: new Date() }).where(eq(messages.id, id));
  return { success: true, data: undefined };
}

export async function unarchiveMessage(id: number): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  await db.update(messages).set({ archivedAt: null }).where(eq(messages.id, id));
  return { success: true, data: undefined };
}

export async function deleteMessage(id: number): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  await db.delete(messages).where(eq(messages.id, id));
  return { success: true, data: undefined };
}
