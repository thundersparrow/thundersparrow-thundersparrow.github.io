var express = require('express');
var config = require('./config');

//SERVER EXPRESS
var app = express();
var port = 3000;
app.listen(port, function(){
  console.log("Thunder Sparrow server is running: port " + port);
});

app.use(express.static('docs'));