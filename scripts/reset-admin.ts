import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { user, session } from "../lib/db/schema/auth";
import { eq } from "drizzle-orm";
import { auth } from "../lib/auth";

const OLD_EMAIL = process.argv[2];
const NEW_EMAIL = process.argv[3];
const NEW_NAME = process.argv[4] ?? "Admin";
const NEW_PASSWORD = process.argv[5];

if (!OLD_EMAIL || !NEW_EMAIL || !NEW_PASSWORD) {
  console.error(
    "Usage: bun scripts/reset-admin.ts <old-email> <new-email> <new-name> <new-password>"
  );
  process.exit(1);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
const db = drizzle(pool);

// 1. Create the new admin account (Better Auth handles password hashing)
console.log(`→ Creating new user: ${NEW_EMAIL}`);
const signUpResult = await auth.api.signUpEmail({
  body: {
    email: NEW_EMAIL,
    name: NEW_NAME,
    password: NEW_PASSWORD,
  },
});

if (!signUpResult?.user?.id) {
  console.error("❌ Failed to create new user:", signUpResult);
  await pool.end();
  process.exit(1);
}

const newUserId = signUpResult.user.id;

// 2. Promote the new account to admin
await db
  .update(user)
  .set({ role: "admin" })
  .where(eq(user.id, newUserId));

console.log(`✅ New admin created: ${NEW_EMAIL} (id: ${newUserId})`);

// 3. Demote the old admin account to regular user
const demoted = await db
  .update(user)
  .set({ role: "user" })
  .where(eq(user.email, OLD_EMAIL))
  .returning({ id: user.id, email: user.email });

if (demoted.length > 0) {
  console.log(`✅ Demoted old admin: ${OLD_EMAIL}`);

  // 4. Invalidate old admin's sessions
  const cleared = await db
    .delete(session)
    .where(eq(session.userId, demoted[0].id))
    .returning({ id: session.id });
  console.log(`   Cleared ${cleared.length} session(s) for old admin`);
} else {
  console.warn(`⚠️  Old admin not found: ${OLD_EMAIL} (nothing demoted)`);
}

await pool.end();
