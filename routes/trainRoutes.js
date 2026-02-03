import { Router } from 'express';

import { getAllTrainsController } from '../controllers/trainControllers.js';

export const trainRoutes = Router();

trainRoutes.get('/trains', getAllTrainsController);
