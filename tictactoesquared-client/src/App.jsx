import "./App.css"
import React, { useState, useEffect } from 'react';
import OuterBoard from './Components/OuterBoard';
import Status from './Components/Status';
import GameOverOverlay from './Components/GameOverOverlay';
import JoinRoom from './Components/JoinRoom';
import { useSocket } from './Contexts/SocketContext';
import toast, {Toaster} from "react-hot-toast"
import Navbar from "./Components/Navbar";
function App() {
  const socket = useSocket();
  const [roomId, setRoomId] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [finalWinner, setFinalWinner] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [currentPlayer, setCurrentPlayer] = useState('X'); // 'X' starts
  const [nextActiveBoard, setNextActiveBoard] = useState(null);
  const [moveCellIndex, setMoveCellIndex] = useState()
  const checkWinner = (cells) => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8], // rows
      [0,3,6],[1,4,7],[2,5,8], // columns
      [0,4,8],[2,4,6]          // diagonals
    ];
    for (let [a,b,c] of lines) {
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return cells[a];
      }
    }
    return cells.every(cell => cell) ? 'Draw' : null;
  };

  const [boards, setBoards] = useState(Array(9).fill().map(() => ({
    cells: Array(9).fill(null),
    winner: null,
  })));
  const [playerSymbol, setPlayerSymbol] = useState(null); // New state for player's symbol
  const [error, setError] = useState('');

  useEffect(() => {
    if (!socket) return;

    // Listen for opponent's move
    socket.on('moveMade', ({ boardIndex, cellIndex, symbol }) => {
      setBoards((prevBoards) => {
        const newBoards = [...prevBoards];
        newBoards[boardIndex].cells[cellIndex] = symbol;
        
        newBoards[cellIndex].winner ? setNextActiveBoard(null) : setNextActiveBoard(cellIndex)
        // Check for board winner here if needed
        const winner = checkWinner(newBoards[boardIndex].cells)
        newBoards[boardIndex].winner = winner
        return newBoards;
      });

      // Switch player
      setCurrentPlayer((prev) => (prev === 'X' ? 'O' : 'X'));
    });

    // Listen for playerJoined (optional)
    socket.on('playerJoined', (playerId, symbol) => {
      console.log(`Player joined: ${playerId} as ${symbol}`);
      toast(`${symbol} player joined`)
      // Optionally notify the player or update the UI
    });

    // Listen for playerLeft
     // Listen for playerLeft
     socket.on('playerLeft', (playerId, symbol) => {
      console.log(`Player left: ${playerId} (${symbol})`);
      // Optionally, handle game termination or notify the user
      toast(`Player ${symbol} has left the game.`);
      // Reset the game or handle accordingly
      resetGame();
      setRoomId(null);
      setPlayerSymbol(null);
    });

    return () => {
      socket.off('moveMade');
      socket.off('playerJoined');
      socket.off('playerLeft');
    };
  }, [socket]);

  const handleJoin = (joinedRoomId) => {
    setRoomId(joinedRoomId);
  };

  const handleMove = (boardIndex, cellIndex) => {
    if (boards[boardIndex].cells[cellIndex] || boards[boardIndex].winner || gameOver) return;
    if (currentPlayer !== playerSymbol) return; // Ensure it's the player's turn

    // Update local game state
    setBoards((prevBoards) => {
      const newBoards = [...prevBoards];
      newBoards[boardIndex].cells[cellIndex] = playerSymbol;
      newBoards[cellIndex].winner ? setNextActiveBoard(null) : setNextActiveBoard(cellIndex)
      // Check for board winner here
      const winner = checkWinner(newBoards[boardIndex].cells)
      newBoards[boardIndex].winner = winner
      return newBoards;
    });

    // Emit the move to the server
    socket.emit('makeMove', { roomId, boardIndex, cellIndex, symbol: playerSymbol });

    // Switch player
    setCurrentPlayer((prev) => (prev === 'X' ? 'O' : 'X'));
  };

  const resetGame = () => {
    setBoards(Array(9).fill().map(() => ({
      cells: Array(9).fill(null),
      winner: null,
    })));
    setScores({ X: 0, O: 0 });
    setCurrentPlayer('X');
    setNextActiveBoard(null);
    setGameOver(false);
    setFinalWinner(null);
    // Optionally, notify the server or handle game reset
  };

  // Listen for the server's response to 'joinRoom' to set the player's symbol
  useEffect(() => {
    if (!socket) return;

    // This should match the callback structure in server.js
    socket.on('joinRoomResponse', (response) => {
      if (response.status === 'success') {
        setPlayerSymbol(response.symbol);
        setError('');
      } else {
        setError(response.message);
      }
    });

    return () => {
      socket.off('joinRoomResponse');
    };
  }, [socket]);

const checkFinalWinner = (scores) => { 
  let winner = null
  winner = scores.X > scores.O && scores.X !== scores.O ? "X" : "O"
  return winner
} 
const leaveRoom = () => {
  if (!roomId) return;

  socket.emit('leaveRoom', roomId, (response) => {
    if (response.status === 'success') {
      alert('You have left the room.');
      resetGame();
      setRoomId(null);
      setPlayerSymbol(null);
    } else {
      alert(response.message);
    }
  });
};


useEffect(() => { 
  let newScoreBoard = {X: 0, O: 0}
  boards.map((board, idx) => { 
    if(board.winner == "X") newScoreBoard.X +=1
    if(board.winner == "O") newScoreBoard.O +=1
  })
  setScores(newScoreBoard)
  const totalBoards = boards.length;
    const completedBoards = boards.filter(board => board.winner !== null).length;

    // If all inner boards are completed, determine the final winner
    if (completedBoards === totalBoards) {
      setGameOver(true);
      if (newScoreBoard.X > newScoreBoard.O) {
        setFinalWinner('X');
      } else if (newScoreBoard.O > newScoreBoard.X) {
        setFinalWinner('O');
      } else {
        setFinalWinner('Draw');
      }
    }

  



}, [boards])

  return (
    <div className="min-h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 relative transition-colors duration-500">
      <Navbar/>
      <Toaster/>
      {!roomId ? (
        <JoinRoom onJoin={handleJoin} setPlayerSymbol={setPlayerSymbol} setError={setError} />
      ) : (
        <>
          {playerSymbol && <Status currentPlayer={currentPlayer} scores={scores} playerSymbol={playerSymbol} />}
          <OuterBoard 
            boards={boards} 
            handleMove={handleMove} 
            nextActiveBoard={nextActiveBoard} 
          />
          <div className="flex gap-4">
          <button 
            onClick={resetGame} 
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-purple-600 dark:hover:bg-purple-700 transition-colors duration-200"
          >
            Reset Game
          </button>
          <button 
            onClick={leaveRoom} 
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-purple-600 dark:hover:bg-purple-700 transition-colors duration-200"
          >
            Leave Room
          </button>
          </div>
          
          {/* Final Winner Overlay */}
          {gameOver && (
            <GameOverOverlay winner={finalWinner} onReset={resetGame} />
          )}
        </>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default App;