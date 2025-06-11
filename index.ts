// heraldoarman/sea-catering/HeraldoArman-sea-catering-543aaa44ee1449a3c913d1474ab83f85018d0745/index.ts

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './db/schema'; // <-- Impor semua skema

// Berikan objek schema ke drizzle()
export const db = drizzle(process.env.DATABASE_URL!, { schema });

async function main() {
}

main();