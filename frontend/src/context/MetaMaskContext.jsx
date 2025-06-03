import React, { createContext, useState, useContext, useEffect } from 'react';

const MetaMaskContext = createContext();

export const MetaMaskProvider = ({ children }) => {
    const [account, setAccount] = useState('');
    const [isConnected, setIsConnected] = useState(false);

    const connectWallet = async () => {
        try {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });
                setAccount(accounts[0]);
                setIsConnected(true);
            } else {
                alert('Please install MetaMask to use this feature!');
            }
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
        }
    };

    const disconnectWallet = () => {
        setAccount('');
        setIsConnected(false);
    };

    useEffect(() => {
        // Check if already connected
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_accounts' })
                .then(accounts => {
                    if (accounts.length > 0) {
                        setAccount(accounts[0]);
                        setIsConnected(true);
                    }
                });

            // Listen for account changes
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    setIsConnected(true);
                } else {
                    disconnectWallet();
                }
            });
        }
    }, []);

    return (
        <MetaMaskContext.Provider value={{
            account,
            isConnected,
            connectWallet,
            disconnectWallet
        }}>
            {children}
        </MetaMaskContext.Provider>
    );
};

export const useMetaMask = () => {
    const context = useContext(MetaMaskContext);
    if (!context) {
        throw new Error('useMetaMask must be used within a MetaMaskProvider');
    }
    return context;
}; 