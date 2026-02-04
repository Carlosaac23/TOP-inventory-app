import { getAllTrains, getTrainById } from '../db/trainQueries.js';

export async function getAllTrainsController(req, res) {
  const trains = await getAllTrains();
  res.render('trains/index', { trains });
}

export async function getTrainByIdController(req, res) {
  const { trainID } = req.params;
  const train = await getTrainById(trainID);
  res.render('trains/infoTrain', { train });
}
