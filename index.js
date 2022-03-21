const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//Socket IO

io.on('connection', (socket) => {
  console.log('User connected');
});

//Servidor

app.use(express.static(__dirname + ''));
app.set('port',process.env.PORT || 3000);

server.listen(app.get('port'), () => {
  console.log('listening on :',app.get('port') );
});
