const GameResult = require('../models/GameResult');

// Save game result
exports.saveGameResult = async(req, res) => {
    try {
        const { playerAddress, score } = req.body;

        const gameResult = new GameResult({
            playerAddress,
            score
        });

        await gameResult.save();
        res.status(201).json({ success: true, data: gameResult });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get game history
exports.getGameHistory = async(req, res) => {
    try {
        const { playerAddress } = req.query;
        const query = playerAddress ? { playerAddress } : {};

        const gameResults = await GameResult.find(query)
            .sort({ timestamp: -1 })
            .limit(50);

        res.status(200).json({ success: true, data: gameResults });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};