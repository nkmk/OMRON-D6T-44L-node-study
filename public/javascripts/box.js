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

function normalize(value, inMin, inMax, outMin, outMax){
  if(value > inMax){
    return outMax;
  }else if(value < inMin){
    return outMin;
  }
  return (value - inMin)/(inMax -inMin) * outMax + outMin;
}

// http://stackoverflow.com/questions/7604823/how-to-convert-rgb-values-into-regular-css-color-values
function rgbToHex(R, G, B){
    return toHex(R) + toHex(G) + toHex(B);
}

function toHex(n){
    n = parseInt(n, 10);
    if( isNaN(n) ){ 
        return "00";
    }
    n = Math.max(0, Math.min(n,255));
    return "0123456789ABCDEF".charAt((n - n % 16) / 16) + "0123456789ABCDEF".charAt(n % 16);
}
