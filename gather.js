var fs = require('fs');
var locus = require('locus');
var bodyParser = require('body-parser');
var path = require('path');
var methodOverride = require('method-override');
var express = require('express');
var knex = require('./db/knex.js');
var app = express();


var json = require('./guests.json');

for(var guest in json){
  knex('guests').insert({name: guest.replace(/_/g, " "), json: json[guest]}).then(function(guest){
    console.log(guest);
  })
}