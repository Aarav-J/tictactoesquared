

const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Adjust as needed for production
    methods: ['GET', 'POST'],
  },
});

// Data structure to keep track of rooms and their players
const rooms = {}; // { roomId: { players: { socketId: 'X' | 'O' } } }

io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Handle joining a room
  socket.on('joinRoom', (roomId, callback) => {
    // Initialize room if it doesn't exist
    if (!rooms[roomId]) {
      rooms[roomId] = { players: {} };
    }

    const numClients = Object.keys(rooms[roomId].players).length;

    if (numClients >= 2) {
      callback({ status: 'error', message: 'Room is full.' });
      return;
    }

    // Assign symbol based on the number of players
    const assignedSymbol = numClients === 0 ? 'X' : 'O';
    rooms[roomId].players[socket.id] = assignedSymbol;

    // Join the socket to the room
    socket.join(roomId);

    // Emit the assigned symbol to the client
    callback({ status: 'success', message: 'Joined room successfully.', symbol: assignedSymbol });

    // Notify the other player in the room about the new player
    socket.to(roomId).emit('playerJoined', socket.id, assignedSymbol);
  });

  // Handle game moves
  socket.on('makeMove', (data) => {
    const { roomId, boardIndex, cellIndex, symbol } = data;

    // Broadcast the move to the other player in the room
    socket.to(roomId).emit('moveMade', { boardIndex, cellIndex, symbol });
  });

  //Handle leaving a room 
  socket.on('leaveRoom', (roomId, callback) => {
    // Check if the room exists
    if (rooms[roomId] && rooms[roomId].players[socket.id]) {
      const playerSymbol = rooms[roomId].players[socket.id];

      // Remove the player from the room
      delete rooms[roomId].players[socket.id];
      socket.leave(roomId);

      // Notify the remaining player in the room
      socket.to(roomId).emit('playerLeft', socket.id, playerSymbol);

      // If the room is empty, delete it
      if (Object.keys(rooms[roomId].players).length === 0) {
        delete rooms[roomId];
      }

      // Acknowledge the client that they've left the room
      callback({ status: 'success', message: 'Left room successfully.' });
    } else {
      // If the room doesn't exist or the player wasn't in the room
      callback({ status: 'error', message: 'You are not in this room.' });
    }
  });
  // Handle disconnections
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);

    // Remove the player from any rooms they were part of
    for (const roomId in rooms) {
      if (rooms[roomId].players[socket.id]) {
        delete rooms[roomId].players[socket.id];

        // Notify remaining players in the room
        socket.to(roomId).emit('playerLeft', socket.id);

        // If the room is empty, delete it
        if (Object.keys(rooms[roomId].players).length === 0) {
          delete rooms[roomId];
        }
        break;
      }
    }
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});