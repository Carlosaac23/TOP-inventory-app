import { pool } from './pool.js';

export async function getAllScales() {
  const { rows } = await pool.query('SELECT * FROM scales');
  return rows;
}

export async function getAllBrands() {
  const { rows } = await pool.query('SELECT * FROM brands');
  return rows;
}

export async function updateItemById(table, itemID, updates) {
  const { model, model_id, description, price, stock_quantity } = updates;
  const { rows } = await pool.query(
    `UPDATE ${table}
     SET model = $1,
         model_id = $2,
         description = $3,
         price = $4,
         stock_quantity = $5
     WHERE id = $6
     RETURNING *`,
    [model, model_id, description, price, stock_quantity, itemID]
  );
  return rows[0];
}

export async function addItem(table, itemData) {
  const {
    model,
    model_id,
    description,
    category_id,
    scale_id,
    brand_id,
    price,
    stock_quantity,
  } = itemData;
  const { rows } = await pool.query(
    `INSERT INTO ${table} (model, model_id, description, category_id, scale_id, brand_id, price, stock_quantity)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [
      model,
      model_id,
      description,
      category_id,
      scale_id,
      brand_id,
      price,
      stock_quantity,
    ]
  );
  return rows[0];
}
