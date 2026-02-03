import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';

import { trainRoutes } from './routes/trainRoutes.js';

const app = express();
const PORT = 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetsPath = path.join(__dirname, 'public');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.use('/', trainRoutes);

app.listen(PORT, error => {
  if (error) {
    throw error;
  }
  console.log(`Working on http://localhost:${PORT}`);
});
