import { pool } from './pool.js';

export async function getAllTrains() {
  const { rows } = await pool.query('SELECT * FROM trains');
  return rows;
}
