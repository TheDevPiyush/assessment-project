const express = require('express');
const router = express.Router();
const { getGameHistory } = require('../controllers/gameHistoryController');

// GET /api/games/history
router.get('/history', getGameHistory);

module.exports = router;