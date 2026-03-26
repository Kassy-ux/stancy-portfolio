import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./src/db/schema";
import { desc } from "drizzle-orm";

async function test() {
  const db = drizzle(process.env.DATABASE_URL!, { schema });
  console.log("Testing contactMessagesTable...");
  try {
    const messages = await db.query.contactMessagesTable.findMany({
      orderBy: desc(schema.contactMessagesTable.createdAt)
    });
    console.log(`Success! Found ${messages.length} messages.`);
  } catch (e: any) {
    console.log(`Error querying contactMessagesTable: ${e.message}`);
    console.log(e.stack);
  }

  console.log("\nTesting communityTable...");
  try {
    const communities = await db.query.communityTable.findMany();
    console.log(`Success! Found ${communities.length} communities.`);
  } catch (e: any) {
    console.log(`Error querying communityTable: ${e.message}`);
  }
}
test();
