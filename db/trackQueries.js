import { pool } from './pool.js';

export async function getAllTracks() {
  const { rows } = await pool.query('SELECT * FROM tracks');
  return rows;
}

export async function getAllTrackCategories() {
  const { rows } = await pool.query('SELECT * FROM track_categories');
  return rows;
}
