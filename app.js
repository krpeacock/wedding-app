var fs = require('fs');
var locus = require('locus');
var bodyParser = require('body-parser');
var path = require('path');
var methodOverride = require('method-override');
var express = require('express');
var router = express.Router();
//var knex = require('./db/knex.js');
var app = express();
var gifts = require('./routes/gifts');
var guests = require('./routes/guests');

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "jade");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(methodOverride('_method'));


var json = require('./guests.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(express.static(path.join(__dirname, 'public')));



//Routing
app.use('/:guest_id/gifts', gifts);
app.use('/', guests);



//Launch application
app.listen(process.env.PORT || 5000, function(){
  console.log("Starting a server on localhost:5000");
});
