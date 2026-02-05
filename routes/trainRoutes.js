import { Router } from 'express';

import {
  getAllTrainsController,
  getTrainByIdController,
  getUpdateFormController,
  putUpdateFormController,
  getAddFormController,
  putAddFormController,
} from '../controllers/trainControllers.js';

export const trainRoutes = Router();

trainRoutes.get('/', getAllTrainsController);
trainRoutes.route('/add').get(getAddFormController).put(putAddFormController);
trainRoutes
  .route('/:trainID/update')
  .get(getUpdateFormController)
  .put(putUpdateFormController);
trainRoutes.get('/:trainID', getTrainByIdController);
