const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('It works!');
});

app.listen(PORT, () => {
  console.log('Test server running at http://localhost:${PORT}');
});