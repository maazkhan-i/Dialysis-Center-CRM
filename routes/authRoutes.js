const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const router = express.Router();

// 🧠 Load users from users.json
const users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));

/* ================================
   🟢 LOGIN (no bcrypt, plain text)
================================ */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user from users.json
    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ message: 'User not found' });

    // 🔹 Compare plain text password
    if (password !== user.password)
      return res.status(400).json({ message: 'Invalid credentials' });

    // 🔹 Create JWT token with role
    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: '✅ Login successful',
      token,
      user: { name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================================
   🟣 Example Admin-only Route
================================ */
router.get('/admin', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin')
      return res.status(403).json({ message: 'Access denied: Admins only' });

    res.json({ message: 'Welcome Admin!', user: decoded });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
