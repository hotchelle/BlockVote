//var mysql = require("mysql");
var express = require('express');
var app = express();
//var connection = require('../Database/database.js');
var pool = require('../Database/dbtwo.js');

app.get('/', function(req, res) {
    res.send("Hello world");
});

app.listen(3000, function(){
  console.log("App listening on port 3000");
  /*connection.connect(function(err){
    if(err) throw err;
    console.log("Database connected");
  })
  */

  pool.getConnection( (err, conn) => {
    if(err) throw err;
    console.log("Database connected");
  });
});
