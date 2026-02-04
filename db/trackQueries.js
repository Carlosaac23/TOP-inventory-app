import { pool } from './pool.js';

export async function getAllTracks() {
  const { rows } = await pool.query('SELECT * FROM tracks');
  return rows;
}

export async function getTrackById(trackID) {
  const { rows } = await pool.query('SELECT * FROM tracks WHERE id = $1', [
    trackID,
  ]);
  return rows[0];
}

export async function getAllTrackCategories() {
  const { rows } = await pool.query('SELECT * FROM track_categories');
  return rows;
}
