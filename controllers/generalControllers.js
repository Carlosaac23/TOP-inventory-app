import {
  getAllItems,
  getCategoriesByType,
  getItemById,
  getScalesAndBrands,
  addItem,
  updateItemById,
  deleteItemById,
} from '../db/queries.js';

export function getHomepage(req, res) {
  res.render('index');
}

export function getAboutPage(req, res) {
  res.render('pages/about');
}

export function getShippingPage(req, res) {
  res.render('pages/shipping');
}

export function getContactPage(req, res) {
  res.render('pages/contact');
}

export function getReturnsPage(req, res) {
  res.render('pages/returns');
}

export async function getBrandsPage(req, res) {
  const { _scales, brands } = await getScalesAndBrands();

  res.render('pages/brands', { brands });
}

export function createGetAllItemsController({ path, type, singular, plural }) {
  return async function (req, res) {
    try {
      const { category, scale, brand } = req.query;
      const items = await getAllItems(path, { category, scale, brand });
      const categories = await getCategoriesByType(type);
      const { scales, brands } = await getScalesAndBrands();

      res.render('pages/items-collection', {
        itemNamePlural: plural,
        itemNameSingular: singular,
        path,
        items,
        categories,
        scales,
        brands,
        filters: { category, scale, brand },
      });
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).render('error', {
        message: `Unable to load ${type}`,
        error: process.env.NODE_ENV === 'development' ? error : {},
      });
    }
  };
}

export function createGetItemByIdController({ path, type, singular, plural }) {
  return async function (req, res) {
    try {
      const paramName = `${type}ID`;
      const itemID = req.params[paramName];
      const item = await getItemById(path, itemID);

      if (!item) {
        return res.status(404).render('error', {
          message: `${singular} not found`,
          error: { details: `No ${type} found with ID ${itemID}` },
        });
      }

      const categories = await getCategoriesByType(type);
      const { scales, brands } = await getScalesAndBrands();

      res.render('pages/item-info', {
        itemNamePlural: plural,
        itemNameSingular: singular,
        path,
        item,
        categories,
        scales,
        brands,
      });
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).render('error', {
        message: `Unable to load ${type}`,
        error: process.env.NODE_ENV === 'development' ? error : {},
      });
    }
  };
}

export function createGetAddFormController({ path, type, singular }) {
  return async function (req, res) {
    try {
      const categories = await getCategoriesByType(type);
      const { scales, brands } = await getScalesAndBrands();

      res.render('forms/addForm', {
        title: singular,
        path,
        categories,
        scales,
        brands,
      });
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).render('error', {
        message: 'Error loading add form',
        error: process.env.NODE_ENV === 'development' ? error : {},
      });
    }
  };
}

export function createPostAddFormController({ path, type }) {
  return async function (req, res) {
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

      await addItem(path, {
        model,
        model_id: Number(model_id),
        description,
        category_id,
        scale_id,
        brand_id,
        price: Number(price),
        stock_quantity: Number(stock_quantity),
        image_url,
      });

      return res.redirect(`/${path}`);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).render('error', {
        message: `Error adding ${type}`,
        error: process.env.NODE_ENV === 'development' ? error : {},
      });
    }
  };
}

export function createGetUpdateFormController({ path, type, singular }) {
  return async function (req, res) {
    try {
      const paramName = `${type}ID`;
      const itemID = req.params[paramName];
      const item = await getItemById(path, itemID);

      if (!item) {
        return res.status(404).render('error', {
          message: `${singular} not found`,
          error: {
            details: `Cannot update - ${type} ${itemID} does not exist`,
          },
        });
      }

      const categories = await getCategoriesByType(type);
      const { scales, brands } = await getScalesAndBrands();

      res.render('forms/updateForm', {
        title: singular,
        item,
        path,
        categories,
        scales,
        brands,
      });
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).render('error', {
        message: 'Error loading update form',
        error: process.env.NODE_ENV === 'development' ? error : {},
      });
    }
  };
}

export function createPutUpdateFormController({ path, type, singular }) {
  return async function (req, res) {
    try {
      const paramName = `${type}ID`;
      const itemID = req.params[paramName];
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

      const updatedItem = await updateItemById(path, itemID, {
        model,
        model_id: Number(model_id),
        description,
        category_id,
        scale_id,
        brand_id,
        price: Number(price),
        stock_quantity: Number(stock_quantity),
        image_url,
      });

      if (!updatedItem) {
        return res.status(404).render('error', {
          message: `${singular} not found`,
          error: {
            details: `Cannot update - ${type} ${itemID} does not exist`,
          },
        });
      }

      return res.redirect(`/${path}/${itemID}`);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).render('error', {
        message: `Error updating ${type}`,
        error: process.env.NODE_ENV === 'development' ? error : {},
      });
    }
  };
}

export function createDeleteItemController({ path, type }) {
  return async function (req, res) {
    try {
      const paramName = `${type}ID`;
      const itemID = req.params[paramName];
      await deleteItemById(path, itemID);
      return res.redirect(`/${path}`);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).render('error', {
        message: `Error deleting ${type}`,
        error: process.env.NODE_ENV === 'development' ? error : {},
      });
    }
  };
}
