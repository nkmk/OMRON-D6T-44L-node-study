// var socket = io.connect(location.protocol+"//"+location.hostname);
var socket = io.connect();

var w = $(".container").width();
var h = w;
var col_num = 4;
var row_num = 4;

$(function(){
  var dataset = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  d3.select(".container").append("svg").attr({width: w, height: h})
  .selectAll("circle").data(dataset).enter().append("circle").attr({
    cx: function(d, i) {
      return (i%col_num * w/col_num) + w/col_num/2;
    },
    cy: function(d, i){
      return (Math.floor(i/row_num) * h/row_num) + h/row_num/2;
    }
  });
});

socket.on('connect', function(){
  console.log('client:connect');
});

socket.on('tempData', function(data){
  var temp;
  var dataset = data.TEMP;
  var minTemp = Number($("#minTemp").val()) || 0;
  var maxTemp = Number($("#maxTemp").val()) || 0;

  var scaleR = d3.scale.linear()
    .domain([minTemp, maxTemp])
    .range([0, w/col_num/2])
    .clamp(true);

  var scaleColor = d3.scale.linear()
    .domain([minTemp, maxTemp])
    .range([0, 255])
    .clamp(true);

  d3.select(".container").selectAll("circle").data(dataset).attr({
    r: function(d) {
      return scaleR(d);
    },
    fill: function(d){
      temp = scaleColor(d);
      return "#" + rgbToHex(temp, 0, 255-temp);
    }
  });
});