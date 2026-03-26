import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { sql } from "drizzle-orm";

async function run() {
  const db = drizzle(process.env.DATABASE_URL!);
  console.log("Starting robust migration...");

  const renames = [
    { table: "projectsTable", old: "projectId", new: "id" },
    { table: "skillsTable", old: "skillId", new: "id" },
    { table: "testimonialsTable", old: "testimonialId", new: "id" },
    { table: "educationTable", old: "educationId", new: "id" },
    { table: "communityTable", old: "communityId", new: "id" },
    { table: "usersTable", old: "userId", new: "id" },
  ];

  for (const { table, old, new: newName } of renames) {
    try {
      // Check if old column exists
      const check = await db.execute(sql`
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = ${table} AND column_name = ${old}
      `);
      
      if (check.rowCount > 0) {
        console.log(`Renaming ${table}.${old} to ${newName}...`);
        await db.execute(sql.raw(`ALTER TABLE "${table}" RENAME COLUMN "${old}" TO "${newName}"`));
      } else {
        console.log(`Column ${table}.${old} not found, skipping.`);
      }
    } catch (e: any) {
      console.error(`Error processing ${table}:`, e.message);
    }
  }

  // Create certificationsTable
  try {
    console.log("Creating certificationsTable...");
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "certificationsTable" (
        "id" serial PRIMARY KEY NOT NULL,
        "issuer" text NOT NULL,
        "certificateName" text NOT NULL,
        "description" text,
        "issueDate" text NOT NULL,
        "expiryDate" text,
        "certificateUrl" text,
        "order" integer DEFAULT 0
      )
    `);
  } catch (e: any) {
    console.error("Error creating certificationsTable:", e.message);
  }

  // Drop experienceTable
  try {
    console.log("Dropping experienceTable...");
    await db.execute(sql`DROP TABLE IF EXISTS "experienceTable"`);
  } catch (e: any) {
    console.error("Error dropping experienceTable:", e.message);
  }

  console.log("Migration finished.");
}

run().catch(console.error);
