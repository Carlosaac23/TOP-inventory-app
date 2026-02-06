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
  const {
    model,
    model_id,
    description,
    category_id,
    scale_id,
    brand_id,
    price,
    stock_quantity,
    image_url,
  } = updates;
  console.log('DB:', image_url);
  const { rows } = await pool.query(
    `UPDATE ${table}
     SET model = $1,
         model_id = $2,
         description = $3,
         category_id = $4, 
         scale_id = $5, 
         brand_id = $6,
         price = $7,
         stock_quantity = $8,
         image_url = $9
     WHERE id = $10
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
      image_url,
      itemID,
    ]
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
    image_url,
  } = itemData;
  const { rows } = await pool.query(
    `INSERT INTO ${table} (model, model_id, description, category_id, scale_id, brand_id, price, stock_quantity, image_url)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
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
      image_url,
    ]
  );
  return rows[0];
}
