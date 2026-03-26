import db from '../db/index';
import { certificationsTable } from '../db/schema';
import { asc } from 'drizzle-orm';

async function test() {
  try {
    const res = await db.select().from(certificationsTable).orderBy(asc(certificationsTable.order));
    console.log('Result:', res);
  } catch (e: any) {
    console.error('Error Stack:', e.stack);
    console.error('Error Message:', e.message);
  }
}
test();
