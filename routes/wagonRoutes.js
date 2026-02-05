import { Router } from 'express';

import {
  getAllWagonsController,
  getWagonByIdController,
  getUpdateFormController,
  putUpdateFormController,
  getAddFormController,
  postAddFormController,
} from '../controllers/wagonControllers.js';
import { adminPassword } from '../middleware/adminPassword.js';

export const wagonRoutes = Router();

wagonRoutes.get('/', getAllWagonsController);
wagonRoutes
  .route('/add')
  .get(adminPassword, getAddFormController)
  .post(postAddFormController);
wagonRoutes
  .route('/:wagonID/update')
  .get(getUpdateFormController)
  .put(putUpdateFormController);
wagonRoutes.get('/:wagonID', getWagonByIdController);
