import { configDotenv } from 'dotenv';
configDotenv({ path: '.env.local' });
import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
