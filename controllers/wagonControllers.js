import {
  createGetAllItemsController,
  createGetItemByIdController,
  createGetAddFormController,
  createPostAddFormController,
  createGetUpdateFormController,
  createPutUpdateFormController,
  createDeleteItemController,
} from './generalControllers.js';

const wagonObject = {
  path: 'wagons',
  type: 'wagon',
  singular: 'Wagon',
  plural: 'Wagons',
};

export const getAllWagonsController = createGetAllItemsController(wagonObject);

export const getWagonByIdController = createGetItemByIdController(wagonObject);

export const getAddFormController = createGetAddFormController(wagonObject);

export const postAddFormController = createPostAddFormController(wagonObject);

export const getUpdateFormController =
  createGetUpdateFormController(wagonObject);

export const putUpdateFormController =
  createPutUpdateFormController(wagonObject);

export const deleteWagonController = createDeleteItemController(wagonObject);
