

import React from 'react';

const Cell = ({ value, onClick, isClickable }) => {
  return (
    <button 
      onClick={onClick} 
      className={`w-16 h-16 flex items-center justify-center text-2xl font-bold 
        ${isClickable ? 'hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer' : 'cursor-not-allowed'} 
        bg-gray-100 dark:bg-gray-800 
        text-gray-900 dark:text-white 
        transition-colors duration-200`}
      disabled={!isClickable || value}
    >
      {value}
    </button>
  );
};

export default Cell;