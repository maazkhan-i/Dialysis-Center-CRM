const express = require('express');
const app = express();

// middleware (to parse JSON)
app.use(express.json());

// simple route
app.get('/', (req, res) => {
  res.send('Hello from Node.js Backend!');
});

// server listen
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
