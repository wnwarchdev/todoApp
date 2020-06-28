const express = require('express');
const path = require('path');
const db = require('./db.js');
const socket = require('socket.io');

const app = express();

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

const io = socket(server);

io.on('connection', (socket) => {
  
  socket.emit('updateData', db.tasks);

  socket.on('addTask', (newTask) => {
    db.tasks.push(newTask);
    socket.broadcast.emit('addTask', newTask);
  });

  socket.on('removeTask', (taskId) => {
    db.tasks.splice(taskId,1);
    socket.broadcast.emit('removeTask', taskId);
  });
}); 