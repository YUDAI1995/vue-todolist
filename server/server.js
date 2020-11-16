//fsモジュール, 公式備え付け
const fs = require('fs')
const http = require('http')
// サーバーオブジェクト作成
const server = http.createServer()

//クライアントからリクエストあった時の処理
server.on('request', (req, res) => {
  const stream = fs.createReadStream('index.html')
  res.writeHead(200, { 'Content-Type': 'text/html' })
  stream.pipe(res)
})

//ポート番号、サーバー待受状態
server.listen(process.env.PORT || 4000)

//以下Socket.io部分
const io = require('socket.io').listen(server)

io.on('connection', socket => {
  // クライアントへデータ送信
  socket.emit('hello', { hello: 'world' })

  socket.on('event', data => {
    console.log(data)
  })
})


// socketイベントの設定
io.on('connection', (socket) => {
  console.log('connected:', socket.id);

  // 切断時
  socket.on('disconnect', () => {
    console.log('disconnected:', socket.id);
  });

  // ユーザの参加
  // socket.on('send', (message) => {
  //   io.emit('send', message);
  // });

  // タスクの追加
  socket.on('addtask', (task) => {
    console.log('added!')
    io.emit('addtask', task);
  });
});