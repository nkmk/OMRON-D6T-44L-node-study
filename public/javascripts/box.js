// var socket = io.connect(location.protocol+"//"+location.hostname);
var socket = io.connect();

socket.on('connect', function(){
    console.log('client:connect');
});

socket.on('jsonData', function(data){
  var temp;
  var i;
  var selector;

  var minTemp = Number($("#minTemp").val()) || 0;
  var maxTemp = Number($("#maxTemp").val()) || 0;

  if(data.PTAT > 0){
    for(i=0; i<16; i++){
      selector = "#box" + i;
      $(selector).text(data.TEMP[i] + "°");
      temp = normalize(data.TEMP[i], minTemp, maxTemp, 0, 255);
      $(selector).css("background-color", rgbToHex(temp, 0, 255-temp));
    }
  }
});