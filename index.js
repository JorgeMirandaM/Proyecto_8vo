const express = require('express');

const http = require('http');

const { Server } = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = new Server(server);
const Serialport = require('serialport');
const Readline = Serialport.parsers.Readline;


const port = new Serialport('COM4',{
    baudRate:9600
});

const parser = port.pipe(new Readline({delimiter: '\r\n'}));

parser.on('open', function(){
    console.log('connection is opened');
});

parser.on('data', function (data) {
  console.log(data);
 let temp = parseInt(data, 10) + " °C";

  io.emit('temp', data.toString());
});

port.on('error',function(err){
    console.log(err);
});

app.use(express.static(__dirname + ''));
//Socket IO

io.on('connection', (socket) => {
  console.log('a user connected');
});

//Servidor

server.listen(3000, () => {
  console.log('listening on :',3000 );
});

