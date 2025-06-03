const API_URL = 'http://localhost:5000/api/game-results';

export const saveGameResult = async(playerAddress, score) => {
    try {
        const response = await fetch(`${API_URL}/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ playerAddress, score }),
        });
        return await response.json();
    } catch (error) {
        console.error('Error saving game result:', error);
        throw error;
    }
};

export const getGameHistory = async(playerAddress = null) => {
    try {
        const url = playerAddress ?
            `${API_URL}/history?playerAddress=${playerAddress}` :
            `${API_URL}/history`;

        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error fetching game history:', error);
        throw error;
    }
};