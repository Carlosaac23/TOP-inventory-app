import { getAllWagons, getWagonById } from '../db/wagonQueries.js';

export async function getAllWagonsController(req, res) {
  const wagons = await getAllWagons();
  res.render('wagons/index', { wagons });
}

export async function getWagonByIdController(req, res) {
  const { wagonID } = req.params;
  const wagon = await getWagonById(wagonID);
  res.render('wagons/infoWagon', { wagon });
}
