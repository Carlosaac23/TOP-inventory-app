import { pool } from './pool.js';
import {
  validateTableName,
  validateCategoryType,
  safeQuerySingle,
  safeQueryMany,
} from './safeQuery.js';

export async function getAllItems(table, { category, scale, brand }) {
  validateTableName(table);
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

  let sql = `SELECT * FROM ${table}`;
  if (where.length) {
    sql += ` WHERE ${where.join(' AND ')}`;
  }

  return await safeQueryMany(
    () => pool.query(sql, values),
    `getAllItems(${table})`
  );
}

export async function getItemById(table, itemID) {
  validateTableName(table);

  return await safeQuerySingle(
    () => pool.query(`SELECT * FROM ${table} WHERE id = $1`, [itemID]),
    `getItemById(${table}, ${itemID})`
  );
}

export async function getCategoriesByType(item) {
  validateCategoryType(item);

  return await safeQueryMany(
    () => pool.query(`SELECT * FROM ${item}_categories`),
    `getAllItemsCategories(${item})`
  );
}

export async function getAllScales() {
  return await safeQueryMany(
    () => pool.query('SELECT * FROM scales'),
    'getAllScales()'
  );
}

export async function getAllBrands() {
  return await safeQueryMany(
    () => pool.query('SELECT * FROM brands'),
    'getAllBrands()'
  );
}

export async function updateItemById(table, itemID, updates) {
  validateTableName(table);

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

  return await safeQuerySingle(
    () =>
      pool.query(
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
      ),
    `updateItemById(${table}, ${itemID})`
  );
}

export async function addItem(table, itemData) {
  validateTableName(table);

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

  return await safeQuerySingle(
    () =>
      pool.query(
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
      ),
    `addItem(${table})`
  );
}

export async function deleteItemById(table, itemID) {
  validateTableName(table);
  return await safeQueryMany(
    () => pool.query(`DELETE FROM ${table} WHERE id = $1`, [itemID]),
    `deleteItemById(${table}, ${itemID})`
  );
}
