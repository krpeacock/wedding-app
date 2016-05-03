var express = require('express')
var router = express.Router({mergeParams: true});
var knex = require('../db/knex');

router.get("/", function(req, res){
  knex('guests').then(function(guests){
     res.render("index", {guests: guests});
  })
})

router.get("/react", function(req, res){
  knex('guests').then(function(guests){
     res.render("react", {guests: guests});
  })
})

router.get("/rsvp", function(req, res){
  knex('guests').then(function(guests){
     res.render("rsvps", {guests: guests});
  })
})

router.get('/json/guests', function(req, res){
  knex('guests').then(function(guests){
     res.format({
       'application/json':() =>{
        res.send(guests)
      },
     })
  })
})

router.get('/new', function(req, res){
  res.render('guests/new');
})

router.get('/:id', function(req, res){
  knex('guests').where('id', +req.params.id).first().then(function(guest){
    knex('gifts').where('guest_id', +req.params.id).then(function(gifts){
      res.render("guests/show", {guest: guest, gifts: gifts})
    })
  })
})

router.get('/:id/edit', function(req, res){
  knex('guests').where('id', +req.params.id).first().then(function(guest){
    knex('gifts').where('guest_id', +req.params.id).then(function(gifts){
      res.render("guests/edit", {guest: guest, gifts: gifts})
    })
  })
})

router.post('/', function(req, res){
  knex('guests').insert({name: req.body.name, json: req.body.json}).then(function(){
    res.redirect('/');
  });
})

router.put('/:id', function(req, res){
  knex('guests').where('id', +req.params.id).update({json: req.body.json}).then(function(user){
    res.redirect(`/${+req.params.id}`)
  });
})

router.delete('/:id', function(req, res){
  knex('guests').where('id', +req.params.id).delete().then(function(user){
    res.redirect(`/`)
  });
})

module.exports = router;