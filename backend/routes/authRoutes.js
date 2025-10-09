// backend/routes/authRoutes.js
const express = require('express');
const {
  login,
  adminAccess,
  caseManagerAccess,
  nurseAccess,
  billerAccess,
  referralAgentAccess
} = require('../controllers/loginController');
const { verifyToken, authorizeRole } = require('../utils/authMiddleware');

const router = express.Router();

/* ================================
   LOGIN ROUTE
================================ */
router.post('/login', login);

/* ================================
    ROLE-SPECIFIC ROUTES
================================ */
router.get('/admin', verifyToken, authorizeRole('Admin'), adminAccess);
router.get('/case-manager', verifyToken, authorizeRole('Case Manager'), caseManagerAccess);
router.get('/nurse', verifyToken, authorizeRole('Nurse'), nurseAccess);
router.get('/biller', verifyToken, authorizeRole('Biller'), billerAccess);
router.get('/referral-agent', verifyToken, authorizeRole('Referral Agent'), referralAgentAccess);

module.exports = router;
