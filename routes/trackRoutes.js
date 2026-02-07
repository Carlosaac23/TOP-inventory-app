import { Router } from 'express';

import {
  getAllTracksController,
  getTrackByIdController,
  getUpdateFormController,
  putUpdateFormController,
  getAddFormController,
  postAddFormController,
  deleteTrackController,
} from '../controllers/trackControllers.js';
import { adminPassword } from '../middleware/auth.js';

export const trackRoutes = Router();

trackRoutes.get('/', getAllTracksController);
trackRoutes
  .route('/add')
  .get(getAddFormController)
  .post(adminPassword, postAddFormController);
trackRoutes
  .route('/:trackID/update')
  .get(getUpdateFormController)
  .put(adminPassword, putUpdateFormController);
trackRoutes.get('/:trackID', getTrackByIdController);
trackRoutes.delete('/:trackID/delete', deleteTrackController);
