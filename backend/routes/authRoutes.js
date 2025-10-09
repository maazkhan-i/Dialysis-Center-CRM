const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const router = express.Router();

// 🧠 Load users from users.json
const users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));

/* ================================
   🟢 LOGIN (plain text version)
================================ */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user from users.json
    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Compare password (plain text for now)
    if (password !== user.password)
      return res.status(400).json({ message: 'Invalid credentials' });

    // Create JWT token with email + role
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
   🔒 Verify Token Helper
================================ */
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach decoded user info
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

/* ================================
   🎯 Role-based Middleware
================================ */
function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: `Access denied: ${role}s only` });
    }
    next();
  };
}

/* ================================
   🌐 Role-Specific Routes
================================ */

// 👑 Admin route
router.get('/admin', verifyToken, authorizeRole('Admin'), (req, res) => {
  res.json({ message: 'Welcome Admin!', user: req.user });
});

// 📋 Case Manager route
router.get('/case-manager', verifyToken, authorizeRole('Case Manager'), (req, res) => {
  res.json({ message: 'Welcome Case Manager!', user: req.user });
});

// 🩺 Nurse route
router.get('/nurse', verifyToken, authorizeRole('Nurse'), (req, res) => {
  res.json({ message: 'Welcome Nurse!', user: req.user });
});

// 💰 Biller route
router.get('/biller', verifyToken, authorizeRole('Biller'), (req, res) => {
  res.json({ message: 'Welcome Biller!', user: req.user });
});

// 🤝 Referral Agent route
router.get('/referral-agent', verifyToken, authorizeRole('Referral Agent'), (req, res) => {
  res.json({ message: 'Welcome Referral Agent!', user: req.user });
});

module.exports = router;
