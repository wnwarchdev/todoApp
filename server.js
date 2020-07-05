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
  console.log('tasks on start: ',db.tasks)

  socket.on('addTask', (newTask) => {
    db.tasks.push(newTask);
    socket.broadcast.emit('addTask', newTask);
    console.log('after add: ',db.tasks)
  });

  socket.on('removeTask', (taskId) => {
    console.log('taskId is: ',taskId);
    const ind = db.tasks.findIndex(item => item.id == taskId);
    db.tasks.splice(ind, 1);
    socket.broadcast.emit('removeTask', taskId);
    console.log('after remove: ',db.tasks)
  });
}); 