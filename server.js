'use strict';

var http = require('http');
var express = require('express');
var app = express();
var ejsEngine = require('ejs-locals');
var auth = require('./auth')
var controllers = require('./controllers');
var bodyParser = require('body-parser');
var connectFlash = require('connect-flash');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

app.set('view engine', 'vash');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(connectFlash());
app.use(cookieParser());
app.use(expressSession({ secret: 'KhanhDosTheBoard' }));
// Setup the View engine
// app.set('view engine', 'jade');

// support master pages
// app.engine('ejs', ejsEngine);
// app.set('view engine', 'ejs');
// server page is only going to know about the init of the main controllers

//use auth
auth.init(app);
// Map the routes of our whole project
controllers.init(app);

app.get('/api/users', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send({ name: 'Khanh', isValid: true, group: 'Admin' });
});

var server = http.createServer(app);

server.listen(3000);

var updater = require('./updater');
updater.init(server);

