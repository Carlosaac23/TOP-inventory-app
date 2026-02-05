import { getAllBrands } from '../db/generalQueries.js';

export function getHomepage(req, res) {
  res.render('index');
}

export function getAboutPage(req, res) {
  res.render('about');
}

export function getShippingPage(req, res) {
  res.render('shipping');
}

export function getContactPage(req, res) {
  res.render('contact');
}

export function getReturnsPage(req, res) {
  res.render('returns');
}

export async function getBrandsPage(req, res) {
  const brands = await getAllBrands();
  res.render('brands', { brands });
}
