const express = require('express');
const router = express.Router();
const {
  login,
  adminAccess,
  caseManagerAccess,
  nurseAccess,
  billerAccess,
  referralAgentAccess
} = require('../controllers/loginController');
const { verifyToken, authorizeRole } = require('../utils/helpers');

// 🟢 Login route
router.post('/login', login);

// 🎯 Role-based routes
router.get('/admin', verifyToken, authorizeRole('Admin'), adminAccess);
router.get('/case-manager', verifyToken, authorizeRole('Case Manager'), caseManagerAccess);
router.get('/nurse', verifyToken, authorizeRole('Nurse'), nurseAccess);
router.get('/biller', verifyToken, authorizeRole('Biller'), billerAccess);
router.get('/referral-agent', verifyToken, authorizeRole('Referral Agent'), referralAgentAccess);

module.exports = router;
