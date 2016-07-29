var express = require('express');
var app		= express();
var http 	= require('http');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

var server 	= http.Server(app);

var PORT = process.env.port || 3000;

var db = require('./config/db');

mongoose.connect(db.url, function(err) {
	console.log('Connected to db at', db.url);
	if (err) {
		console.log('error');
		throw err;
	}
});

require(__dirname + '/app/js/routes')(app);

app.use('/static', express.static(__dirname + '/app'));

app.use(bodyParser.json());

server.listen(PORT, function() {
	console.log("listening on port ", PORT);
});