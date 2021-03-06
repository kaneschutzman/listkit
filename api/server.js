/*
* listkit.co
* Alexander di Chiara - 2015
*/
var express  	= require('express');
var app			= require('express')();
var server 		= require('http').Server(app);
var port   		= process.env.PORT || 3000;
var mongoose 	= require('mongoose');
var bodyParser  = require('body-parser');
var configDB	= require('./helpers/database.js');
var http 		= require('http');
var server = http.createServer(app);

mongoose.connect(configDB.url); // MongoDB.

// Just pushing JSON, we're not serving pages at all.
server.listen(port);
// Bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
 
console.log('ready to go here: ' + port);

// Routes
var routes = {};
routes.lists = require('./route/lists.js');

// Headers
app.all('*', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.set('Access-Control-Allow-Credentials', true);
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});

// REST endpoints 
app.get('/api/v1/lists/load', routes.lists.load); 
app.post('/api/v1/lists/list', routes.lists.save); 
app.post('/api/v1/lists/edit', routes.lists.edit); 
app.get('/api/v1/lists/mostforked', routes.lists.mostforked);
app.get('/api/v1/lists/latestfive', routes.lists.latestfive);
app.post('/api/v1/lists/search', routes.lists.search);