import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { MetaMaskProvider } from './context/MetaMaskContext';
import GameHistory from './components/GameHistory';
import './App.css';

function App() {
  return (
    <MetaMaskProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <Link to="/" className="text-xl font-bold text-gray-800">
                    Memory Game
                  </Link>
                </div>
                <div className="flex items-center space-x-4">
                  <Link
                    to="/"
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    to="/history"
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Game History
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/history" element={<GameHistory />} />
              <Route path="/" element={
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-8">
                    Welcome to Memory Game
                  </h1>
                  <p className="text-lg text-gray-600 mb-8">
                    Play the game and track your progress with MetaMask!
                  </p>
                  <Link
                    to="/history"
                    className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    View Game History
                  </Link>
                </div>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </MetaMaskProvider>
  );
}

export default App;
