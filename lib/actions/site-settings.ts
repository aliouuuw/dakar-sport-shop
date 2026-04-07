"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth-server";
import { eq } from "drizzle-orm";

const ALLOWED_KEYS = [
  "siteName",
  "tagline",
  "phones",
  "email",
  "address",
  "aboutText",
  "whatsapp",
  "facebook",
  "instagram",
  "openingHours",
  "logoUrl",
  "faviconUrl",
] as const;

type SettingKey = (typeof ALLOWED_KEYS)[number];

const updateSettingSchema = z.object({
  key: z.enum(ALLOWED_KEYS),
  value: z.string().min(1, "La valeur ne peut pas être vide"),
});

export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function getSiteSettings(): Promise<Record<string, string>> {
  const rows = await db.select().from(siteSettings);
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export async function updateSiteSetting(
  key: string,
  value: string
): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  const parsed = updateSettingSchema.safeParse({ key, value });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  await db
    .insert(siteSettings)
    .values({ key: parsed.data.key as SettingKey, value: parsed.data.value, type: "string" })
    .onConflictDoUpdate({
      target: siteSettings.key,
      set: { value: parsed.data.value },
    });

  return { success: true, data: undefined };
}

export async function updateSiteSettings(
  entries: Array<{ key: string; value: string }>
): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  for (const entry of entries) {
    const parsed = updateSettingSchema.safeParse(entry);
    if (!parsed.success) {
      return { success: false, error: `Clé invalide: ${entry.key}` };
    }
  }

  for (const entry of entries) {
    await db
      .insert(siteSettings)
      .values({ key: entry.key as SettingKey, value: entry.value, type: "string" })
      .onConflictDoUpdate({
        target: siteSettings.key,
        set: { value: entry.value },
      });
  }

  return { success: true, data: undefined };
}

export async function deleteSiteSetting(key: string): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Accès refusé : rôle administrateur requis" };
  }

  await db.delete(siteSettings).where(eq(siteSettings.key, key));
  return { success: true, data: undefined };
}
