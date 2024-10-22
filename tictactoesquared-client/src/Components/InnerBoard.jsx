

import React from 'react';
import Cell from './Cells';

const InnerBoard = ({ boardIndex, board, handleMove, isActive, globalNextActive }) => {
  const getBorderClasses = () => {
    // Highlight active boards
    if (isActive && board.winner === null) {
      return 'border-2 border-primary';
    }
    return 'border';
  };

  const handleCellClick = (cellIndex) => {
    if (board.cells[cellIndex] || board.winner) return;
    handleMove(boardIndex, cellIndex);
  };

  return (
    <div className={`relative grid grid-cols-3 gap-px bg-gray-200 dark:bg-gray-700 ${getBorderClasses()} rounded transition-colors duration-500`}>
      {board.cells.map((cell, idx) => (
        <Cell 
          key={idx}
          value={cell}
          onClick={() => handleCellClick(idx)}
          isClickable={isActive && board.winner === null}
        />
      ))}
      {/* Overlay for won boards */}
      {board.winner && board.winner !== 'Draw' && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-90 dark:bg-gray-600 dark:bg-opacity-90 rounded">
          {/* Background Symbol */}
          <span 
            className={`absolute inset-0 flex items-center justify-center text-6xl font-bold 
                        ${board.winner === 'X' ? 'text-red-500' : 'text-green-500'} opacity-50`}
            style={{ transform: 'rotate(-15deg)' }}
          >
            {board.winner}
          </span>
          {/* Foreground Symbol */}
          <span className="relative z-10 text-6xl font-bold text-gray-900 dark:text-white">
            {board.winner}
          </span>
        </div>
      )}
      {board.winner === 'Draw' && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-75 dark:bg-gray-600 dark:bg-opacity-75 rounded">
          <span className="text-lg font-bold text-gray-700 dark:text-gray-300">Draw</span>
        </div>
      )}
    </div>
  );
};

export default InnerBoard;