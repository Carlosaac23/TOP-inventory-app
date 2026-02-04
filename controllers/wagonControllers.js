import { getAllWagons, getWagonById } from '../db/wagonQueries.js';

export async function getAllWagonsController(req, res) {
  try {
    const wagons = await getAllWagons();

    res.render('wagons/index', { wagons });
  } catch (error) {
    console.error(error);
  }
}

export async function getWagonByIdController(req, res) {
  try {
    const { wagonID } = req.params;
    const wagon = await getWagonById(wagonID);

    res.render('wagons/infoWagon', { wagon });
  } catch (error) {
    console.error(error);
  }
}
