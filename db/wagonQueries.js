import { pool } from './pool.js';

export async function getAllWagons({ category, scale, brand }) {
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

  let sql = 'SELECT * FROM wagons';
  if (where.length) {
    sql += ` WHERE ${where.join(' AND ')}`;
  }

  const { rows } = await pool.query(sql, values);
  return rows;
}

export async function getWagonById(wagonID) {
  const { rows } = await pool.query('SELECT * FROM wagons WHERE id = $1', [
    wagonID,
  ]);
  return rows[0];
}

export async function getAllWagonCategories() {
  const { rows } = await pool.query('SELECT * FROM wagon_categories');
  return rows;
}
