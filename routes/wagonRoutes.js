import { Router } from 'express';

import {
  getAllWagonsController,
  getWagonByIdController,
} from '../controllers/wagonControllers.js';

export const wagonRoutes = Router();

wagonRoutes.get('/', getAllWagonsController);
wagonRoutes.get('/:wagonID', getWagonByIdController);
