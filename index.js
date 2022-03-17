const express = require('express');
const morgan = require('morgan');
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

app.use(express.static(__dirname + '/public'));
app.set('port',process.env.PORT || 3000);

server.listen(app.get('port'), () => {
  console.log('listening on :',app.get('port') );
});
//Arduino
const Serialport = require('serialport');
const Readline = Serialport.parsers.Readline;


const port = new Serialport('COM3',{
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
