var express = require('express')
var router = express.Router({mergeParams: true});
var knex = require('../db/knex');
var fs = require('fs');

var guests;

fs.readFile('guests.json', function(err, data){
	guests = JSON.parse(data);
})


function saveGuests(){
	fs.writeFile('guests.json', JSON.stringify(guests),  function(err){
		if (err) console.log(err);
	})
}

function findGuest (key, value){
	return guests.filter(val=>{
		return val[key] === value;
	})[0];
}

router.get("/", function(req, res){
     res.render("react");
})

router.get('/guests', function(req, res){
	res.format({
		'application/json':() =>{
			res.json(guests)
		},
	})
})
	
router.get('/new', function(req, res){
  res.render('guests/new');
})



router.get('/:id', function(req, res){

		var found = findGuest('id', +req.params.id);
		res.render("guests/show",{guest: found});

})
//  knex('guests').where('id', +req.params.id).first().then(function(guest){
//    knex('gifts').where('guest_id', +req.params.id).then(function(gifts){
//      res.render("guests/show", {guest: guest, gifts: gifts})
//    })
//  })
//})
//


router.get('/:id/edit', function(req, res){
	var found = findGuest('id', +req.params.id);
	res.render("guests/edit",{guest: found});
})
//  knex('guests').where('id', +req.params.id).first().then(function(guest){
//    knex('gifts').where('guest_id', +req.params.id).then(function(gifts){
//      res.render("guests/edit", {guest: guest, gifts: gifts})
//    })
//  })
//})
//
router.post('/', function(req, res){
	guests.push({name: req.body.name, json:req.body.json});
	
	var save = new Promise((resolve,reject)=>{
		saveGuests();
	}).then(res.redirect('/'))
	
})

//  knex('guests').insert({name: req.body.name, json: req.body.json}).then(function(){
//    res.redirect('/');
//  });
//})

router.post('/rsvp', function(req, res){
//  knex('guests').where("id", req.body.guest_id).first().then(function(guest){
//    var json = guest.json;
//    json.RSVP = req.body.rsvp;
//    knex('guests').where('id', req.body.guest_id).update({json: json}).then(function(updated){
//      res.send(updated);
//    })
//  })
//})
//router.post('/thanked', function(req, res){
//  knex('guests').where("id", req.body.guest_id).first().then(function(guest){
//    var json = guest.json;
//    json.Thanked = req.body.thanked;
//    knex('guests').where('id', req.body.guest_id).update({json: json}).then(function(updated){
//      res.send(updated);
//    })
//  })
//})
//
//router.put('/:id', function(req, res){
//  knex('guests').where('id', +req.params.id).update({json: req.body.json}).then(function(user){
//    res.redirect(`/${+req.params.id}`)
//  });
//})
//
//router.delete('/:id', function(req, res){
//  knex('guests').where('id', +req.params.id).delete().then(function(user){
//    res.redirect(`/`)
//  });
//})

module.exports = router;
