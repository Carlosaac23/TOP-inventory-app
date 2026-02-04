import { Router } from 'express';

import {
  getAllTracksController,
  getTrackByIdController,
} from '../controllers/trackControllers.js';

export const trackRoutes = Router();

trackRoutes.get('/', getAllTracksController);
trackRoutes.get('/:trackID', getTrackByIdController);
