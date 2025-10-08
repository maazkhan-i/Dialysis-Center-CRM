const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Temporary in-memory "users"
const users = [];

// 🟢 Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, email, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🟢 Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
