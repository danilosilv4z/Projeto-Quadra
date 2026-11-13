const express = require('express');
const router = express.Router();
const { getAllAvisos, createAviso, deleteAviso } = require('../controllers/avisoController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

router.get('/', getAllAvisos);

router.post('/', verifyToken, verifyAdmin, createAviso);
router.delete('/:id', verifyToken, verifyAdmin, deleteAviso);

module.exports = router;