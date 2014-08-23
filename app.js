var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var portName = "/dev/tty.usbmodem1411";

// list ports
serialport.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
    console.log(port.pnpId);
    console.log(port.manufacturer);
  });
});

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
            console.log('PTAT: ' + jsonData.PTAT);
            console.log('TEMP: ' + jsonData.TEMP);
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