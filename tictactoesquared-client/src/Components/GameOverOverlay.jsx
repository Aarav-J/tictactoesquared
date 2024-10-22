// src/components/GameOverOverlay.js

import React from 'react';

const GameOverOverlay = ({ winner, onReset }) => {
  const getMessage = () => {
    if (winner === 'Draw') return "It's a Draw!";
    return `Player ${winner} Wins!`;
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center transition-colors duration-500">
        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{getMessage()}</h2>
        <button 
          onClick={onReset} 
          className="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-purple-600 dark:hover:bg-purple-700 transition-colors duration-200"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOverOverlay;