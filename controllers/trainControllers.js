import { getAllScales, getAllBrands } from '../db/generalQueries.js';
import {
  getAllTrains,
  getTrainById,
  updateTrainById,
  getAllTrainCategories,
} from '../db/trainQueries.js';

export async function getAllTrainsController(req, res) {
  const { category, scale, brand } = req.query;

  try {
    const trains = await getAllTrains({ category, scale, brand });
    const scales = await getAllScales();
    const brands = await getAllBrands();
    const categories = await getAllTrainCategories();

    res.render('trains/index', {
      trains,
      scales,
      brands,
      categories,
      filters: { category, scale, brand },
    });
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

export async function getUpdateFormController(req, res) {
  try {
    const { trainID } = req.params;
    const train = await getTrainById(trainID);

    if (!train) {
      return res.status(404).send('Train not found');
    }

    res.render('forms/updateForm', {
      title: 'Train',
      item: train,
      path: 'trains',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting train');
  }
}

export async function putUpdateFormController(req, res) {
  try {
    const { trainID } = req.params;
    const { model, model_id, description, price, stock_quantity } = req.body;

    const updatedTrain = await updateTrainById(trainID, {
      model,
      model_id,
      description,
      price: Number(price),
      stock_quantity: Number(stock_quantity),
    });

    if (!updatedTrain) {
      return res.status(404).send('Train not found');
    }

    return res.redirect(`/trains/${trainID}`);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error updating train');
  }
}
