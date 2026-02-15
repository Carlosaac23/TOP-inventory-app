import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import methodOverride from 'method-override';

import { generalRoute } from './routes/generalRoutes.js';
import { trackRoutes } from './routes/trackRoutes.js';
import { trainRoutes } from './routes/trainRoutes.js';
import { wagonRoutes } from './routes/wagonRoutes.js';

const app = express();
const PORT = 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetsPath = path.join(__dirname, 'public');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

app.use('/', generalRoute);
app.use('/trains', trainRoutes);
app.use('/wagons', wagonRoutes);
app.use('/tracks', trackRoutes);

async function startServer() {
  try {
    console.log('Starting Supabase Models Servers...\n');

    app.listen(PORT, error => {
      if (error) {
        console.error('Failed to start server:', error);
        throw error;
      }
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Fatal error starting server:', error);
    process.exit(1);
  }
}

startServer();
