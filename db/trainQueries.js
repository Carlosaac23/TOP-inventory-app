import { pool } from './pool.js';

export async function getAllTrains() {
  const { rows } = await pool.query('SELECT * FROM trains');
  return rows;
}

export async function getTrainById(trainId) {
  const { rows } = await pool.query('SELECT * FROM trains WHERE id = $1', [
    trainId,
  ]);
  return rows[0];
}
