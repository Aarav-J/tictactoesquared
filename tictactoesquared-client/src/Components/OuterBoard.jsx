
import React from 'react';
import InnerBoard from './InnerBoard';
import { useSocket } from '../Contexts/SocketContext';

const OuterBoard = ({ boards, handleMove, nextActiveBoard }) => {
  const socket = useSocket();

  return (
    <div className="grid grid-cols-3 gap-2 border-4 border-primary p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-500">
      {boards.map((board, idx) => (
        <InnerBoard 
          key={idx}
          boardIndex={idx}
          board={board}
          handleMove={handleMove}
          isActive={nextActiveBoard === null || nextActiveBoard === idx}
          globalNextActive={nextActiveBoard}
        />
      ))}
    </div>
  );
};

export default OuterBoard;