var express = require('express')
var router = express.Router({mergeParams: true});
var knex = require('../db/knex');

router.get('/new', function(req, res){
  knex('guests').where('id', +req.params.guest_id).first().then(function(guest){
    knex('gifts').where('guest_id', +req.params.guest_id).then(function(gifts){
      res.render('gifts/new', {guest: guest, gifts: gifts});
    })
  })
})

router.get('/:id', function(req, res){
  knex('guests').where('id', +req.params.guest_id).first().then(function(guest){
    knex('gifts').where('id', +req.params.id).first().then(function(gift){
      res.render('gifts/show', {guest: guest, gift: gift});
    })
  })
})

router.get('/:id/edit', function(req, res){
  knex('guests').where('id', +req.params.guest_id).first().then(function(guest){
    knex('gifts').where('id', +req.params.id).first().then(function(gift){
      res.render('gifts/edit', {guest: guest, gift: gift});
    })
  })
})

router.put('/:id', function(req, res){
  knex('gifts').where('id', +req.params.id).update({description: req.body.description, img: req.body.img}).then(function(){
    res.redirect(`/${+req.params.id}`)
  })
})

router.delete('/:id', function(req,res){
  knex('gifts').where('id', +req.params.id).del().then(function(){
    res.redirect(`/${+req.params.guest_id}`);
  })
})

router.post('/', function(req, res){
  knex('gifts').insert({guest_id: +req.params.guest_id, description: req.body.description, img: req.body.img}).then(function(){
    res.redirect(`/${+req.params.guest_id}`)
  })
})


module.exports = router;