const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const io = require('socket.io').listen(server);

//クライアントからリクエストあった時の処理
// server.on('request', (req, res) => {
//    const stream = fs.createReadStream('index.html');
//   const stream = fs.createReadStream('/');
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   stream.pipe(res);
// });
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});
//app.use(express.static(path.join(__dirname, "../client/build")));

//Socket.io
io.on('connection', (socket) => {
  socket.emit('hello', { hello: 'world' });
  socket.on('event', (data) => {
    console.log(data);
  });
});

// socketイベントの設定
io.on('connection', (socket) => {
  console.log('connected:', socket.id);

  // 切断時
  socket.on('disconnect', () => {
    console.log('disconnected:', socket.id);
  });

  // タスクの追加
  socket.on('addtask', (task) => {
    console.log('added!');
    io.emit('addtask', task);
  });
});

server.listen(process.env.PORT || 3000);