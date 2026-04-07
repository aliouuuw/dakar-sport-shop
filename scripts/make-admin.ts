import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { user, session } from "../lib/db/schema/auth";
import { eq } from "drizzle-orm";

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
const db = drizzle(pool);

// Ensure admin role
const result = await db
  .update(user)
  .set({ role: "admin" })
  .where(eq(user.email, "admin@dakarsport.sn"))
  .returning({ id: user.id, email: user.email, role: user.role });

console.log("Updated user:", result);

// Clear all sessions so the user must re-login with fresh data
if (result.length > 0) {
  const deleted = await db
    .delete(session)
    .where(eq(session.userId, result[0].id))
    .returning({ id: session.id });
  console.log("Cleared sessions:", deleted.length);
}

await pool.end();
