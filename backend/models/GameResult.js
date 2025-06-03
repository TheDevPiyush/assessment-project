const mongoose = require('mongoose');

const gameResultSchema = new mongoose.Schema({
    playerAddress: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('GameResult', gameResultSchema);