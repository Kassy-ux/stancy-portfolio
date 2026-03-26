import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { sql } from "drizzle-orm";

async function check() {
  const db = drizzle(process.env.DATABASE_URL!);
  const result = await db.execute(sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`);
  // console.log("Tables:", result.map(t => t.table_name));
}
check().catch(console.error);
