import {
  getAllBrands,
  getAllScales,
  updateItemById,
  addItem,
} from '../db/generalQueries.js';
import {
  getAllTracks,
  getTrackById,
  getAllTrackCategories,
} from '../db/trackQueries.js';

export async function getAllTracksController(req, res) {
  const { category, scale, brand } = req.query;

  try {
    const tracks = await getAllTracks({ category, scale, brand });
    const scales = await getAllScales();
    const brands = await getAllBrands();
    const categories = await getAllTrackCategories();

    res.render('tracks/index', {
      tracks,
      scales,
      brands,
      categories,
      filters: { category, scale, brand },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading tracks');
  }
}

export async function getTrackByIdController(req, res) {
  try {
    const { trackID } = req.params;
    const track = await getTrackById(trackID);

    res.render('tracks/infoTrack', { track });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting track');
  }
}

export async function getUpdateFormController(req, res) {
  try {
    const { trackID } = req.params;
    const track = await getTrackById(trackID);

    if (!track) {
      return res.status(404).send('Track not found');
    }

    res.render('forms/updateForm', {
      title: 'Track',
      item: track,
      path: 'tracks',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting track');
  }
}

export async function putUpdateFormController(req, res) {
  try {
    const { trackID } = req.params;
    const { model, model_id, description, price, stock_quantity } = req.body;

    const updatedTrack = await updateItemById('tracks', trackID, {
      model,
      model_id,
      description,
      price: Number(price),
      stock_quantity: Number(stock_quantity),
    });

    if (!updatedTrack) {
      return res.status(404).send('Track not found');
    }

    return res.redirect(`/tracks/${trackID}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating track');
  }
}

export async function getAddFormController(req, res) {
  try {
    const categories = await getAllTrackCategories();
    const scales = await getAllScales();
    const brands = await getAllBrands();

    res.render('forms/addForm', {
      title: 'Track',
      path: 'tracks',
      categories,
      scales,
      brands,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading add track form');
  }
}

export async function postAddFormController(req, res) {
  try {
    const {
      model,
      model_id,
      description,
      category_id,
      scale_id,
      brand_id,
      price,
      stock_quantity,
    } = req.body;
    await addItem('tracks', {
      model,
      model_id,
      description,
      category_id: Number(category_id),
      scale_id: Number(scale_id),
      brand_id: Number(brand_id),
      price: Number(price),
      stock_quantity: Number(stock_quantity),
    });

    return res.redirect('/tracks');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding new track');
  }
}
