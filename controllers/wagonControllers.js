import {
  getAllScales,
  getAllBrands,
  updateItemById,
  addItem,
} from '../db/generalQueries.js';
import {
  getAllWagons,
  getWagonById,
  getAllWagonCategories,
} from '../db/wagonQueries.js';

export async function getAllWagonsController(req, res) {
  const { category, scale, brand } = req.query;

  try {
    const wagons = await getAllWagons({ category, scale, brand });
    const scales = await getAllScales();
    const brands = await getAllBrands();
    const categories = await getAllWagonCategories();

    res.render('wagons/index', {
      wagons,
      scales,
      brands,
      categories,
      filters: { category, scale, brand },
    });
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

export async function getUpdateFormController(req, res) {
  try {
    const { wagonID } = req.params;
    const wagon = await getWagonById(wagonID);

    if (!wagon) {
      return res.status(404).send('Wagon not found');
    }

    res.render('forms/updateForm', {
      title: 'Wagon',
      item: wagon,
      path: 'wagons',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting wagon');
  }
}

export async function putUpdateFormController(req, res) {
  try {
    const { wagonID } = req.params;
    const { model, model_id, description, price, stock_quantity } = req.body;

    const updatedWagon = await updateItemById('wagons', wagonID, {
      model,
      model_id,
      description,
      price: Number(price),
      stock_quantity: Number(stock_quantity),
    });

    if (!updatedWagon) {
      return res.status(404).send('Wagon not found');
    }

    return res.redirect(`/wagons/${wagonID}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating wagon');
  }
}

export async function getAddFormController(req, res) {
  try {
    const categories = await getAllWagonCategories();
    const scales = await getAllScales();
    const brands = await getAllBrands();

    res.render('forms/addForm', {
      title: 'Wagon',
      path: 'wagons',
      categories,
      scales,
      brands,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading add wagon form');
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
    await addItem('wagons', {
      model,
      model_id,
      description,
      category_id: Number(category_id),
      scale_id: Number(scale_id),
      brand_id: Number(brand_id),
      price: Number(price),
      stock_quantity: Number(stock_quantity),
    });

    return res.redirect('/wagons');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding new wagon');
  }
}
