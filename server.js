var express = require('express');
var app		= express();
var http 	= require('http');

var server 	= http.Server(app);

var PORT = process.env.port || 3000;

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/app/views/index.html');
});

app.use('/static', express.static(__dirname + '/app'));

server.listen(PORT, function() {
	console.log("listening on port ", PORT);
});