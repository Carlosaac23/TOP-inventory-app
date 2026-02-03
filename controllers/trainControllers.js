import { getAllTrains } from '../db/trainQueries.js';

export async function getAllTrainsController(req, res) {
  const trains = await getAllTrains();
  res.render('trains/index', { trains });
}
