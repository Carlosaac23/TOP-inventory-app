import { Router } from 'express';

import {
  getAllTrainsController,
  getTrainByIdController,
  getUpdateFormController,
  putUpdateFormController,
} from '../controllers/trainControllers.js';

export const trainRoutes = Router();

trainRoutes.get('/', getAllTrainsController);
trainRoutes
  .route('/:trainID/update')
  .get(getUpdateFormController)
  .put(putUpdateFormController);
trainRoutes.get('/:trainID', getTrainByIdController);
