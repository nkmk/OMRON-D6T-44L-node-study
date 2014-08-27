// var socket = io.connect(location.protocol+"//"+location.hostname);
var socket = io.connect();

var minTemp = 20;
var maxTemp = 40;

socket.on('connect', function(){
    console.log('client:connect');
});

socket.on('tempData', function(data){
  var temp;
  var i;
  var selector;

  minTemp = Number($("#minTemp").val()) || 0;
  maxTemp = Number($("#maxTemp").val()) || 0;

  for(i=0; i<16; i++){
    selector = "#box" + i;
    $(selector).text(data.TEMP[i] + " deg");
    temp = normalize(data.TEMP[i], minTemp, maxTemp, 0, 255);
    $(selector).css("background-color", rgbToHex(temp, 0, 255-temp));
  }
});