import { pool } from './pool.js';

export async function getAllItems(table, { category, scale, brand }) {
  try {
    let queryDescription = `SELECT * FROM ${table}`;
    const values = [];
    const conditions = [];

    if (category != null && category !== '') {
      values.push(category);
      conditions.push(`category_id = $${values.length}`);
    }
    if (scale != null && scale !== '') {
      values.push(scale);
      conditions.push(`scale_id = $${values.length}`);
    }
    if (brand != null && brand !== '') {
      values.push(brand);
      conditions.push(`brand_id = $${values.length}`);
    }

    if (conditions.length > 0) {
      queryDescription += ' WHERE ' + conditions.join(' AND ');
    }

    const { rows } = await pool.query(queryDescription, values);
    return rows || [];
  } catch (error) {
    throw new Error(`getAllItems(${table}) failed: ${error.message}`);
  }
}

export async function getCategoriesByType(item) {
  try {
    const allowedItems = ['train', 'wagon', 'track'];

    if (!allowedItems.includes(item)) {
      throw new Error('Invalid category');
    }

    const { rows } = await pool.query(`SELECT * FROM ${item}_categories`);
    return rows;
  } catch (error) {
    throw new Error(`getCategoriesByType(${item}) failed: ${error.message}`);
  }
}

export async function getScalesAndBrands() {
  try {
    const [scalesRes, brandsRes] = await Promise.all([
      pool.query('SELECT * FROM scales'),
      pool.query('SELECT * FROM brands'),
    ]);

    return {
      scales: scalesRes.rows,
      brands: brandsRes.rows,
    };
  } catch (error) {
    throw new Error(`getScalesAndBrands() failed: ${error.message}`);
  }
}

export async function getItemById(table, itemID) {
  try {
    const allowedTables = ['trains', 'wagons', 'tracks'];

    if (!allowedTables.includes(table)) {
      throw new Error('Invalid table');
    }

    const { rows } = await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [
      itemID,
    ]);
    return rows[0];
  } catch (error) {
    throw new Error(
      `getItemById(${table}, ${itemID}) failed: ${error.message}`
    );
  }
}

export async function addItem(table, itemData) {
  try {
    const allowedTables = ['trains', 'wagons', 'tracks'];
    const columns = [];
    const placeholders = [];
    const values = [];

    if (!allowedTables.includes(table)) {
      throw new Error('Invalid table');
    }

    for (const [key, value] of Object.entries(itemData)) {
      values.push(value);
      columns.push(key);
      placeholders.push(`$${values.length}`);
    }

    await pool.query(
      `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders.join(', ')})`,
      values
    );
  } catch (error) {
    throw new Error(`addItem(${table}, ${itemData}) failed: ${error.message}`);
  }
}

export async function updateItemById(table, itemID, updates) {
  try {
    const allowedTables = ['trains', 'wagons', 'tracks'];
    const values = [];
    const setClauses = [];

    if (!allowedTables.includes(table)) {
      throw new Error('Invalid table');
    }

    for (const [key, value] of Object.entries(updates)) {
      values.push(value);
      setClauses.push(`${key} = $${values.length}`);
    }

    values.push(itemID);

    const { rows } = await pool.query(
      `UPDATE ${table} SET ${setClauses.join(', ')} WHERE id = $${values.length} RETURNING *`,
      values
    );
    return rows[0];
  } catch (error) {
    throw new Error(
      `updateItemById(${table}, ${itemID}, ${updates}) failed: ${error.message}`
    );
  }
}

export async function deleteItemById(table, itemID) {
  try {
    const allowedTables = ['trains', 'wagons', 'tracks'];

    if (!allowedTables.includes(table)) {
      throw new Error('Invalid table');
    }

    await pool.query(`DELETE FROM ${table} WHERE id = $1`, [itemID]);
  } catch (error) {
    throw new Error(
      `deleteItemById(${table}, ${itemID}) failed: ${error.message}`
    );
  }
}
