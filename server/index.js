const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
var path = require('path');
const io = require('socket.io').listen(server);

app.use(express.static(path.join(__dirname, '../dist/index.html')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

//Socket.io
io.on('connection', (socket) => {
  socket.on('event', (data) => {
    console.log(data);
  });
});

io.on('connection', (socket) => {
  console.log('connected:', socket.id);

  // 切断時
  socket.on('disconnect', () => {
    console.log('disconnected:', socket.id);
  });

  // タスク追加
  socket.on('addtask', (task) => {
    console.log('added!');
    io.emit('addtask', task);
  });
});

server.listen(process.env.PORT || 3000);
