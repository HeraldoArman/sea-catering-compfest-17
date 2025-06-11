// heraldoarman/sea-catering/HeraldoArman-sea-catering-543aaa44ee1449a3c913d1474ab83f85018d0745/utils/auth.ts

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../index";
import * as schema from "../db/schema"; // <-- Impor semua skema

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: schema // <-- Tambahkan baris ini
    }),
    emailAndPassword: {  
        enabled: true
    },
    // ...
});