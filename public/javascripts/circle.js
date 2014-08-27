// var socket = io.connect(location.protocol+"//"+location.hostname);
var socket = io.connect();

var minTemp = 20;
var maxTemp = 40;

var w = 600;
var h = 600;
var col_num = 4;
var row_num = 4;
var circles;

$(function(){
  var svg = d3.select("#wrap").append("svg").attr("width", w).attr("height", h);
  var dataset = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  circles = svg.selectAll("circle").data(dataset).enter().append("circle");
  circles.attr("cx", function(d, i) {
    return (i%col_num * w/col_num) + w/col_num/2;
  })
  .attr("cy",function(d, i){
    return (Math.floor(i/row_num) * h/row_num) + h/row_num/2;
  });
});

socket.on('connect', function(){
  console.log('client:connect');
});

socket.on('tempData', function(data){
  var temp;
  minTemp = Number($("#minTemp").val()) || 0;
  maxTemp = Number($("#maxTemp").val()) || 0;

  circles.attr("r", function(d, i) {
    return normalize(data.TEMP[i], minTemp, maxTemp, 0, w/col_num/2);
  })
  .attr("fill", function(d, i){
    temp = normalize(data.TEMP[i], minTemp, maxTemp, 0, 255);
    return "#" + rgbToHex(temp, 0, 255-temp);
  });
});