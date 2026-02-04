import { getAllTrains, getTrainById } from '../db/trainQueries.js';

export async function getAllTrainsController(req, res) {
  try {
    const trains = await getAllTrains();

    res.render('trains/index', { trains });
  } catch (error) {
    console.error(error);
  }
}

export async function getTrainByIdController(req, res) {
  try {
    const { trainID } = req.params;
    const train = await getTrainById(trainID);

    res.render('trains/infoTrain', { train });
  } catch (error) {
    console.error(error);
  }
}
