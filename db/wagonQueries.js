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

export async function updateWagonById(wagonID, updates) {
  const { model, model_id, description, price, stock_quantity } = updates;
  const { rows } = await pool.query(
    `UPDATE wagons
     SET model = $1,
         model_id = $2,
         description = $3,
         price = $4,
         stock_quantity = $5
     WHERE id = $6
     RETURNING *`,
    [model, model_id, description, price, stock_quantity, wagonID]
  );
  return rows[0];
}

export async function getAllWagonCategories() {
  const { rows } = await pool.query('SELECT * FROM wagon_categories');
  return rows;
}
