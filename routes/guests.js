var express = require('express')
var router = express.Router({mergeParams: true});
var knex = require('../db/knex');

router.get("/", function(req, res){
     res.render("react");
})

router.get('/guests', function(req, res){
  knex('guests').orderBy("id", "asc").then(function(guests){
     res.format({
       'application/json':() =>{
        res.json(guests)
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
router.post('/rsvp', function(req, res){
  knex('guests').where("id", req.body.guest_id).first().then(function(guest){
    var json = guest.json;
    json.RSVP = req.body.rsvp;
    knex('guests').where('id', req.body.guest_id).update({json: json}).then(function(updated){
      res.send(updated);
    })
  })
})
router.post('/thanked', function(req, res){
  knex('guests').where("id", req.body.guest_id).first().then(function(guest){
    var json = guest.json;
    json.Thanked = req.body.thanked;
    knex('guests').where('id', req.body.guest_id).update({json: json}).then(function(updated){
      res.send(updated);
    })
  })
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
