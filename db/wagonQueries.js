import { pool } from './pool.js';

export async function getAllWagons() {
  const { rows } = await pool.query('SELECT * FROM wagons');
  return rows;
}

export async function getWagonById(wagonID) {
  const { rows } = await pool.query('SELECT * FROM wagons WHERE id = $1', [
    wagonID,
  ]);
  return rows[0];
}
