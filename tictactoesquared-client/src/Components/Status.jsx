
import React from 'react';

const Status = ({ currentPlayer, scores, playerSymbol }) => {
  const isPlayerTurn = currentPlayer === playerSymbol;

  return (
    <div className="mb-4 text-center text-gray-900 dark:text-white">
      <div className="text-xl">
        You are: <span className="font-bold">{playerSymbol}</span>
      </div>
      <div className="text-xl">
        Current Turn: <span className="font-bold">{currentPlayer}</span>
        {isPlayerTurn ? ' (Your turn)' : ' (Opponent\'s turn)'}
      </div>
      <div className="mt-2">
        <span className="mr-4">X Wins: {scores.X}</span>
        <span>O Wins: {scores.O}</span>
      </div>
    </div>
  );
};

export default Status;