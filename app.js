var express = require('express');
var path = require('path');

var routes = require('./routes/index.js');  // 拡張子は省略可能
var box = require('./routes/box.js');
var circle = require('./routes/circle.js');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(require('stylus').middleware(path.join(__dirname, 'public')));  // exress.staticより前に書く
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/box', box);
app.use('/circle', circle);


var host = 'localhost';
var port = 3000;

if(process.argv[2]){
    host = process.argv[2];
}

if(process.argv[3]){
    port = process.argv[3];
}

var server = app.listen(port, host);
console.log("server start: http://" + host + ":" + port);


var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

// var portName = "/dev/tty.usbserial-A9IDTB3Z"; // Mac Arduino Nano
var portName = "/dev/tty.usbmodem1411";  // Mac Arduino UNO
// var portName = "COM53"; // Windows

var sp = new SerialPort(portName, {
    baudrate: 9600,
    parser: serialport.parsers.readline("\n")
});
// }, false); // this is the openImmediately flag [default is true]

sp.on("open", function(){
    console.log('open');
    sp.on('data', function(data) {
        var buffer = new Buffer(data, 'utf8');
        var jsonData;
        try {
            jsonData = JSON.parse(buffer);
            if(jsonData.PTAT > 0){
                io.sockets.json.emit('tempData', jsonData);
            }
        } catch(e) {
            // JSONじゃない場合そのまま表示
            console.log("not JSON");
            console.log('data received: ' + data);
            return;
        }
    });
    sp.write("ls\n", function(err, results) {
        console.log('err ' + err);
        console.log('results ' + results);
    });
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
    console.log("server is connected")
});