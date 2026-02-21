import {
  createGetAllItemsController,
  createGetItemByIdController,
  createGetAddFormController,
  createPostAddFormController,
  createGetUpdateFormController,
  createPutUpdateFormController,
  createDeleteItemController,
} from './generalControllers.js';

const trainObject = {
  path: 'trains',
  type: 'train',
  singular: 'Train',
  plural: 'Trains',
};

export const getAllTrainsController = createGetAllItemsController(trainObject);

export const getTrainByIdController = createGetItemByIdController(trainObject);

export const getAddFormController = createGetAddFormController(trainObject);

export const postAddFormController = createPostAddFormController(trainObject);

export const getUpdateFormController =
  createGetUpdateFormController(trainObject);

export const putUpdateFormController =
  createPutUpdateFormController(trainObject);

export const deleteTrainController = createDeleteItemController(trainObject);
