var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
// var portName = "/dev/tty.usbmodem1411";  // Mac Arduino UNO
var portName = "COM53"; // Windows

// list ports
// serialport.list(function (err, ports) {
//   ports.forEach(function(port) {
//     console.log(port.comName);
//     console.log(port.pnpId);
//     console.log(port.manufacturer);
//   });
// });

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
                // console.log('PTAT: ' + jsonData.PTAT);
                // console.log('TEMP: ' + jsonData.TEMP);
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

var http = require('http');
var fs = require('fs');
var url = require('url');

var app_handler = function(req, res) {
    var path, _url;
    _url = url.parse(decodeURI(req.url), true);
    path = _url.pathname === '/' ? '/index.html' : _url.pathname;
    console.log(req.method + " - " + path);
    fs.readFile(__dirname + path, function(err, data) {
        if (err) {
            res.writeHead(500);
            res.end('error load file');
        }
        res.writeHead(200);
        res.end(data);
    });
};

var app = http.createServer(app_handler);
var io = require('socket.io').listen(app);

io.sockets.on('connection', function(socket) {
    console.log("server is connected")
});

var port = 3000;
// var host = 'localhost';
var host = '43.2.97.204';

app.listen(port, host);
console.log("server start: http://" + host + ":" + port);