import { getAllScales, getAllBrands } from '../db/generalQueries.js';
import {
  getAllTrains,
  getTrainById,
  getAllTrainCategories,
} from '../db/trainQueries.js';

export async function getAllTrainsController(req, res) {
  try {
    const trains = await getAllTrains();
    const scales = await getAllScales();
    const brands = await getAllBrands();
    const categories = await getAllTrainCategories();

    res.render('trains/index', { trains, scales, brands, categories });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading trains');
  }
}

export async function getTrainByIdController(req, res) {
  try {
    const { trainID } = req.params;
    const train = await getTrainById(trainID);

    res.render('trains/infoTrain', { train });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting train');
  }
}
