import { Router } from 'express';

import {
  getAllTracksController,
  getTrackByIdController,
  getUpdateFormController,
  putUpdateFormController,
  getAddFormController,
  postAddFormController,
} from '../controllers/trackControllers.js';
import { adminPassword } from '../middleware/adminPassword.js';

export const trackRoutes = Router();

trackRoutes.get('/', getAllTracksController);
trackRoutes
  .route('/add')
  .get(getAddFormController)
  .post(adminPassword, postAddFormController);
trackRoutes
  .route('/:trackID/update')
  .get(getUpdateFormController)
  .put(putUpdateFormController);
trackRoutes.get('/:trackID', getTrackByIdController);
