"use server";

import { db } from "@/lib/db";
import { activityLog } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

export async function logActivity(
  userId: string | null,
  action: string,
  entityType: string,
  entityId?: number | null,
  metadata?: Record<string, unknown> | null
): Promise<void> {
  await db.insert(activityLog).values({
    userId,
    action,
    entityType,
    entityId: entityId ?? null,
    metadata: metadata ?? null,
  });
}

export async function getActivityLog(limit = 50, offset = 0) {
  return db
    .select()
    .from(activityLog)
    .orderBy(desc(activityLog.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function getActivityLogByEntity(entityType: string, entityId: number) {
  return db
    .select()
    .from(activityLog)
    .where(eq(activityLog.entityType, entityType))
    .orderBy(desc(activityLog.createdAt));
}
