// Mock game history data
const mockGameHistory = [{
        id: 1,
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        result: 'Won',
        playerChoice: 'Rock',
        houseChoice: 'Scissors',
        betAmount: 0.1,
        payout: 0.2
    },
    {
        id: 2,
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
        result: 'Lost',
        playerChoice: 'Paper',
        houseChoice: 'Scissors',
        betAmount: 0.15,
        payout: 0
    },
    {
        id: 3,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        result: 'Won',
        playerChoice: 'Scissors',
        houseChoice: 'Paper',
        betAmount: 0.2,
        payout: 0.4
    },
    {
        id: 4,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
        result: 'Lost',
        playerChoice: 'Rock',
        houseChoice: 'Paper',
        betAmount: 0.05,
        payout: 0
    },
    {
        id: 5,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        result: 'Won',
        playerChoice: 'Paper',
        houseChoice: 'Rock',
        betAmount: 0.3,
        payout: 0.6
    }
];

// Get game history
const getGameHistory = (req, res) => {
    try {
        // In a real application, you would fetch this data from a database
        // and filter by the user's wallet address
        res.json(mockGameHistory);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching game history', error: error.message });
    }
};

module.exports = {
    getGameHistory
};