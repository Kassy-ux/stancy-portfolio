import db from '../db/index';
import { sql } from 'drizzle-orm';

async function test() {
  try {
    const res = await db.execute(sql`SELECT count(*) FROM "certificationsTable"`);
    console.log('Count Result:', res);
  } catch (e: any) {
    console.error('Error Message:', e.message);
  }
}
test();
