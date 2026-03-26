import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { sql } from "drizzle-orm";

async function check() {
  const db = drizzle(process.env.DATABASE_URL!);
  const tables = ["projectsTable", "skillsTable", "certificationsTable", "usersTable"];
  
  for (const table of tables) {
    try {
      const result = await db.execute(sql`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = ${table}
      `);
      console.log(`\nColumns for ${table}:`);
      console.log(JSON.stringify(result, null, 2));
    } catch (e: any) {
      console.log(`\nError fetching columns for ${table}:`, e.message);
    }
  }
}
check().catch(console.error);
