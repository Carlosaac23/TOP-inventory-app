import { Router } from 'express';

import { getHomepage } from '../controllers/indexControllers.js';

export const indexRoute = Router();

indexRoute.get('/', getHomepage);
