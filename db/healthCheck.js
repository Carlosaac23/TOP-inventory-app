import { pool } from './pool.js';

const RETRY_CONFIG = {
  maxAttempts: 10,
  delayMs: 5000,
  timeoutMs: 5000,
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testConnection() {
  try {
    const result = await pool.query('SELECT 1 as connected');
    return result.rows[0].connected === 1;
  } catch (error) {
    console.error('Connection test failed:', error.message);
    return false;
  }
}

export async function checkDatabaseHealth() {
  console.log('Checking database connection...');

  for (let attempt = 1; attempt <= RETRY_CONFIG.maxAttempts; attempt++) {
    console.log(`Attempt ${attempt}/${RETRY_CONFIG.maxAttempts}...`);

    const isConnected = await testConnection();

    if (isConnected) {
      console.log('Database connection established successfully!\n');
      return true;
    }

    if (attempt < RETRY_CONFIG.maxAttempts) {
      console.log(`Retrying in ${RETRY_CONFIG.delayMs / 1000} seconds...\n`);
      await sleep(RETRY_CONFIG.delayMs);
    }
  }

  console.error('Database connection failed after all attempts');
  console.error('App will start but database queries will fail!\n');

  return false;
}
