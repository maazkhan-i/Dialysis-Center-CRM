const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');

// Load users from data/users.json
const usersPath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));

/* ================================
   🟢 LOGIN CONTROLLER
================================ */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Compare plain password
    if (password !== user.password)
      return res.status(400).json({ message: 'Invalid credentials' });

    // Create JWT token
    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Optional redirect URLs for frontend
    const roleRedirects = {
      'Admin': '/dashboard/admin',
      'Case Manager': '/dashboard/case-manager',
      'Nurse': '/dashboard/nurse',
      'Biller': '/dashboard/biller',
      'Referral Agent': '/dashboard/referral-agent'
    };

    res.json({
      message: '✅ Login successful',
      token,
      user: { name: user.name, email: user.email, role: user.role },
      redirect: roleRedirects[user.role]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================================
   🔒 ROLE-SPECIFIC CONTROLLERS
================================ */
exports.adminAccess = (req, res) => {
  res.json({ message: 'Welcome Admin!', user: req.user });
};

exports.caseManagerAccess = (req, res) => {
  res.json({ message: 'Welcome Case Manager!', user: req.user });
};

exports.nurseAccess = (req, res) => {
  res.json({ message: 'Welcome Nurse!', user: req.user });
};

exports.billerAccess = (req, res) => {
  res.json({ message: 'Welcome Biller!', user: req.user });
};

exports.referralAgentAccess = (req, res) => {
  res.json({ message: 'Welcome Referral Agent!', user: req.user });
};
