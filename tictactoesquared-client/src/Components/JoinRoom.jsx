
import React, { useState } from 'react';
import { useSocket } from '../Contexts/SocketContext';

const JoinRoom = ({ onJoin, setPlayerSymbol, setError }) => {
  const socket = useSocket();
  const [roomId, setRoomId] = useState('');
  const [localError, setLocalError] = useState('');

  const handleJoin = () => {
    if (!roomId) {
      setLocalError('Room ID cannot be empty.');
      return;
    }

    // Emit joinRoom event with a callback to receive the response
    socket.emit('joinRoom', roomId, (response) => {
      if (response.status === 'success') {
        onJoin(roomId);
        setPlayerSymbol(response.symbol);
        setError('');
        setLocalError('');
      } else {
        setLocalError(response.message);
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Join a Room</h2>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="px-4 py-2 border rounded mb-4 w-64 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
      />
      <button
        onClick={handleJoin}
        className="px-4 py-2 bg-primary text-white rounded hover:bg-purple-600 dark:hover:bg-purple-700 transition-colors duration-200"
      >
        Join
      </button>
      {(localError) && <p className="text-red-500 mt-2">{localError}</p>}
    </div>
  );
};

export default JoinRoom;