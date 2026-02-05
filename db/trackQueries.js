import { pool } from './pool.js';

export async function getAllTracks({ category, scale, brand }) {
  const values = [];
  const where = [];

  if (category) {
    values.push(category);
    where.push(`category_id = $${values.length}`);
  }
  if (scale) {
    values.push(scale);
    where.push(`scale_id = $${values.length}`);
  }
  if (brand) {
    values.push(brand);
    where.push(`brand_id = $${values.length}`);
  }

  let sql = 'SELECT * FROM trains';
  if (where.length) {
    sql += ` WHERE ${where.join(' AND ')}`;
  }

  const { rows } = await pool.query(sql, values);
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
