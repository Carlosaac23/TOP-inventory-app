import { pool } from './pool.js';

export async function getAllTrains({ category, scale, brand }) {
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

export async function getTrainById(trainId) {
  const { rows } = await pool.query('SELECT * FROM trains WHERE id = $1', [
    trainId,
  ]);
  return rows[0];
}

export async function updateTrainById(trainId, updates) {
  const { model, model_id, description, price, stock_quantity } = updates;
  const { rows } = await pool.query(
    `UPDATE trains
     SET model = $1,
         model_id = $2,
         description = $3,
         price = $4,
         stock_quantity = $5
     WHERE id = $6
     RETURNING *`,
    [model, model_id, description, price, stock_quantity, trainId]
  );
  return rows[0];
}

export async function getAllTrainCategories() {
  const { rows } = await pool.query('SELECT * FROM train_categories');
  return rows;
}
