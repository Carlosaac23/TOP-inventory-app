import express from 'express';

const app = express();
const PORT = 8080;

app.get('/', (req, res) => res.send('Holaaaaaaaaaa'));

app.listen(PORT, error => {
  if (error) {
    throw error;
  }
  console.log(`Working on http://localhost:${PORT}`);
});
