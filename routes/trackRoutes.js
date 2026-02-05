import { Router } from 'express';

import {
  getAllTracksController,
  getTrackByIdController,
  getUpdateFormController,
  putUpdateFormController,
} from '../controllers/trackControllers.js';

export const trackRoutes = Router();

trackRoutes.get('/', getAllTracksController);
trackRoutes
  .route('/:trackID/update')
  .get(getUpdateFormController)
  .put(putUpdateFormController);
trackRoutes.get('/:trackID', getTrackByIdController);
