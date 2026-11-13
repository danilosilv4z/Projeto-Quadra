const express = require('express');
const router = express.Router();
const { register, login, verifyToken } = require('../controllers/authController');
const { verifyToken: authMiddleware } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);

router.get('/verify', authMiddleware, verifyToken);

module.exports = router;