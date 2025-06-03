const express = require('express');
const router = express.Router();
const gameResultController = require('../controllers/gameResultController');

// Save game result
router.post('/save', gameResultController.saveGameResult);

// Get game history
router.get('/history', gameResultController.getGameHistory);

module.exports = router;