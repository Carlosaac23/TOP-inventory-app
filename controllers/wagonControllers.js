import {
  getAllItems,
  getItemById,
  getAllItemCategories,
  getAllScales,
  getAllBrands,
  updateItemById,
  addItem,
  deleteItemById,
} from '../db/queries.js';

export async function getAllWagonsController(req, res) {
  const { category, scale, brand } = req.query;

  try {
    const wagons = await getAllItems('wagons', { category, scale, brand });
    const categories = await getAllItemCategories('wagon');
    const scales = await getAllScales();
    const brands = await getAllBrands();

    res.render('wagons/index', {
      wagons,
      categories,
      scales,
      brands,
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
    const wagon = await getItemById('wagons', wagonID);
    const categories = await getAllItemCategories('wagon');
    const scales = await getAllScales();
    const brands = await getAllBrands();

    res.render('wagons/infoWagon', { wagon, scales, brands, categories });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting wagon');
  }
}

export async function getUpdateFormController(req, res) {
  try {
    const { wagonID } = req.params;
    const wagon = await getItemById('wagons', wagonID);
    const categories = await getAllItemCategories('wagon');
    const scales = await getAllScales();
    const brands = await getAllBrands();

    if (!wagon) {
      return res.status(404).send('Wagon not found');
    }

    res.render('forms/updateForm', {
      title: 'Wagon',
      item: wagon,
      path: 'wagons',
      categories,
      scales,
      brands,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting wagon');
  }
}

export async function putUpdateFormController(req, res) {
  try {
    const { wagonID } = req.params;
    const {
      model,
      model_id,
      description,
      category_id,
      scale_id,
      brand_id,
      price,
      stock_quantity,
      image_url,
    } = req.body;

    const updatedWagon = await updateItemById('wagons', wagonID, {
      model,
      model_id,
      description,
      category_id: Number(category_id),
      scale_id: Number(scale_id),
      brand_id: Number(brand_id),
      price: Number(price),
      stock_quantity: Number(stock_quantity),
      image_url,
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
    const categories = await getAllItemCategories('wagon');
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
      image_url,
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
      image_url,
    });

    return res.redirect('/wagons');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding new wagon');
  }
}

export async function deleteWagonController(req, res) {
  try {
    const { wagonID } = req.params;
    await deleteItemById('wagons', wagonID);
    return res.redirect('/wagons');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting wagon');
  }
}
