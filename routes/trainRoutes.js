import { Router } from 'express';

import {
  getAllTrainsController,
  getTrainByIdController,
  getUpdateForm,
  putUpdateForm,
} from '../controllers/trainControllers.js';

export const trainRoutes = Router();

trainRoutes.get('/', getAllTrainsController);
trainRoutes.route('/:trainID/update').get(getUpdateForm).put(putUpdateForm);
trainRoutes.get('/:trainID', getTrainByIdController);
