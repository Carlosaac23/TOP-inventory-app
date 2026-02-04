import { pool } from './pool.js';

export async function getAllScales() {
  const { rows } = await pool.query('SELECT * FROM scales');
  return rows;
}

export async function getAllBrands() {
  const { rows } = await pool.query('SELECT * FROM brands');
  return rows;
}
