import { Router } from 'express';

import { getAllTracksController } from '../controllers/trackControllers.js';

export const trackRoutes = Router();

trackRoutes.get('/', getAllTracksController);
