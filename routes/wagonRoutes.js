import { Router } from 'express';

import {
  getAllWagonsController,
  getWagonByIdController,
  getUpdateFormController,
  putUpdateFormController,
  getAddFormController,
  postAddFormController,
} from '../controllers/wagonControllers.js';

export const wagonRoutes = Router();

wagonRoutes.get('/', getAllWagonsController);
wagonRoutes.route('/add').get(getAddFormController).post(postAddFormController);
wagonRoutes
  .route('/:wagonID/update')
  .get(getUpdateFormController)
  .put(putUpdateFormController);
wagonRoutes.get('/:wagonID', getWagonByIdController);
