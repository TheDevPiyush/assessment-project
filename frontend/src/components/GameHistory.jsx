import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMetaMask } from '../context/MetaMaskContext';
import styles from './GameHistory.module.css';

const GameHistory = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { account, isConnected, connectWallet } = useMetaMask();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/games/history');
                if (!response.ok) {
                    throw new Error('Failed to fetch game history');
                }
                const data = await response.json();
                setGames(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'won':
                return styles.statusWon;
            case 'lost':
                return styles.statusLost;
            default:
                return styles.statusPending;
        }
    };

    const formatAddress = (address) => {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    if (loading) {
        return (
            <div className={styles.loadingSpinner}>
                <div className={styles.spinner}></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <div className={styles.errorContent}>
                    <h2>Error</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <h1 className={styles.title}>Game History</h1>
                        {isConnected && (
                            <div className={styles.walletInfo}>
                                <span className={styles.walletLabel}>Connected:</span>
                                <span className={styles.walletAddress}>{formatAddress(account)}</span>
                            </div>
                        )}
                    </div>
                    <div className={styles.headerRight}>
                        {!isConnected ? (
                            <button
                                onClick={connectWallet}
                                className={styles.connectButton}
                            >
                                Connect Wallet
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate('/')}
                                className={styles.backButton}
                            >
                                Back to Game
                            </button>
                        )}
                    </div>
                </div>

                {!isConnected ? (
                    <div className={styles.connectPrompt}>
                        <h2>Connect Your Wallet</h2>
                        <p>Please connect your MetaMask wallet to view your game history</p>
                        <button
                            onClick={connectWallet}
                            className={styles.connectButton}
                        >
                            Connect MetaMask
                        </button>
                    </div>
                ) : (
                    <>
                        <div className={styles.gamesGrid}>
                            {games.map((game) => (
                                <div key={game.id} className={styles.gameCard}>
                                    <div className={styles.cardHeader}>
                                        <div className={styles.gameInfo}>
                                            <h3>Game #{game.id}</h3>
                                            <p className={styles.timestamp}>
                                                {new Date(game.timestamp).toLocaleString()}
                                            </p>
                                        </div>
                                        <span className={`${styles.status} ${getStatusClass(game.result)}`}>
                                            {game.result}
                                        </span>
                                    </div>

                                    <div className={styles.gameDetails}>
                                        <div className={styles.detailRow}>
                                            <span className={styles.label}>Player Choice:</span>
                                            <span className={styles.value}>{game.playerChoice}</span>
                                        </div>
                                        <div className={styles.detailRow}>
                                            <span className={styles.label}>House Choice:</span>
                                            <span className={styles.value}>{game.houseChoice}</span>
                                        </div>
                                        <div className={styles.detailRow}>
                                            <span className={styles.label}>Bet Amount:</span>
                                            <span className={styles.value}>{game.betAmount} ETH</span>
                                        </div>
                                        <div className={styles.detailRow}>
                                            <span className={styles.label}>Payout:</span>
                                            <span className={styles.value}>{game.payout} ETH</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {games.length === 0 && (
                            <div className={styles.emptyState}>
                                <h3>No games played yet</h3>
                                <p>Start playing to see your game history here!</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default GameHistory; 