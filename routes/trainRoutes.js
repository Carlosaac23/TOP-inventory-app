import { Router } from 'express';

import {
  getAllTrainsController,
  getTrainByIdController,
  getUpdateFormController,
  putUpdateFormController,
  getAddFormController,
  postAddFormController,
  deleteTrainController,
} from '../controllers/trainControllers.js';
import { adminPassword } from '../middleware/adminPassword.js';

export const trainRoutes = Router();

trainRoutes.get('/', getAllTrainsController);
trainRoutes
  .route('/add')
  .get(getAddFormController)
  .post(adminPassword, postAddFormController);
trainRoutes
  .route('/:trainID/update')
  .get(getUpdateFormController)
  .put(adminPassword, putUpdateFormController);
trainRoutes.get('/:trainID', getTrainByIdController);
trainRoutes.delete('/:trainID/delete', deleteTrainController);
