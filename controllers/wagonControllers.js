import { getAllScales, getAllBrands } from '../db/generalQueries.js';
import {
  getAllWagons,
  getWagonById,
  getAllWagonCategories,
} from '../db/wagonQueries.js';

export async function getAllWagonsController(req, res) {
  try {
    const wagons = await getAllWagons();
    const scales = await getAllScales();
    const brands = await getAllBrands();
    const categories = await getAllWagonCategories();

    res.render('wagons/index', { wagons, scales, brands, categories });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading wagons');
  }
}

export async function getWagonByIdController(req, res) {
  try {
    const { wagonID } = req.params;
    const wagon = await getWagonById(wagonID);

    res.render('wagons/infoWagon', { wagon });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting wagon');
  }
}
