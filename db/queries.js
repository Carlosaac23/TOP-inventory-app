import { supabase } from './client.js';

export async function getAllItems(table, { category, scale, brand }) {
  let query = supabase.from(table).select('*');

  if (category != null && category !== '') {
    query = query.eq('category_id', category);
  }
  if (scale != null && scale !== '') {
    query = query.eq('scale_id', scale);
  }
  if (brand != null && brand !== '') {
    query = query.eq('brand_id', brand);
  }

  const { data, error } = await query;
  if (error) throw new Error(`getAllItems(${table}) failed: ${error.message}`);
  return data || [];
}

export async function getCategoriesByType(item) {
  const { data, error } = await supabase.from(`${item}_categories`).select('*');

  if (error) throw new Error(error);
  return data;
}

export async function getScalesAndBrands() {
  const [scalesRes, brandsRes] = await Promise.all([
    supabase.from('scales').select('*'),
    supabase.from('brands').select('*'),
  ]);

  if (scalesRes.error)
    throw new Error(`scales query failed: ${scalesRes.error.message}`);
  if (brandsRes.error)
    throw new Error(`brands query failed: ${brandsRes.error.message}`);

  return {
    scales: scalesRes.data,
    brands: brandsRes.data,
  };
}

export async function getItemById(table, itemID) {
  const { data, error } = await supabase
    .from(table)
    .select()
    .eq('id', itemID)
    .maybeSingle();

  if (error) throw new Error(`error getting item: ${error.message}`);
  return data;
}

export async function addItem(table, itemData) {
  await supabase.from(table).insert(itemData);
}

export async function updateItemById(table, itemID, updates) {
  const { data, error } = await supabase
    .from(table)
    .update(updates)
    .eq('id', itemID)
    .select()
    .maybeSingle();

  if (error) throw new Error(`error updating item: ${error.message}`);
  return data;
}

export async function deleteItemById(table, itemID) {
  await supabase.from(table).delete().eq('id', itemID);
}
