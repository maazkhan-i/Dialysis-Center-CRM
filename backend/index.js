const express = require('express');
const dotenv = require('dotenv');
const loginRoutes = require('./routes/loginRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', loginRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Hello from Dialysis Center Backend 🚀');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
