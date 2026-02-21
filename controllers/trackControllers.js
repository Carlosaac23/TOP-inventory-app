import {
  createGetAllItemsController,
  createGetItemByIdController,
  createGetAddFormController,
  createPostAddFormController,
  createGetUpdateFormController,
  createPutUpdateFormController,
  createDeleteItemController,
} from './generalControllers.js';

const trackObject = {
  path: 'tracks',
  type: 'track',
  singular: 'Track',
  plural: 'Tracks',
};

export const getAllTracksController = createGetAllItemsController(trackObject);

export const getTrackByIdController = createGetItemByIdController(trackObject);

export const getAddFormController = createGetAddFormController(trackObject);

export const postAddFormController = createPostAddFormController(trackObject);

export const getUpdateFormController =
  createGetUpdateFormController(trackObject);

export const putUpdateFormController =
  createPutUpdateFormController(trackObject);

export const deleteTrackController = createDeleteItemController(trackObject);
