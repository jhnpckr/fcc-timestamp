'use strict';

var express = require('express');

var app = express();

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/index.html');
});

app.get('*', function (req, res) {
  var reqstr = decodeURIComponent(req.path.substring(1));
  var unix = Date.parse(reqstr) / 1000;
  var outputobj = {unix: null, natural: null};
  var date;
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  if (Number.isNaN(unix)) {
    date = new Date(reqstr * 1000);
    if (date.toString() !== "Invalid Date") {
      outputobj.unix = reqstr;
    }
  } else  {
    date = new Date(unix * 1000);
    outputobj.unix = unix;
  }
  if (date.toString() !== "Invalid Date") {
    outputobj.natural = date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
  }
  res.send(JSON.stringify(outputobj));

});

app.listen(process.env.PORT || 3000, function () {
    console.log('Listening on port ' + (process.env.PORT ? process.env.PORT : '3000') + '...');
});
