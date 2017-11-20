var express = require('express');
var router = express.Router();
let Game = require('../models/game');

/* GET games listing. */
router.route('/')
	.get(function(req, res) {
      let games = Game.find({});
      games.exec((err, games) => {
      	if(err) res.send(err);
      	res.json(games);
      });
	})
	.post(function(req, res) {
	  var newGame = new Game(req.body);
	  newGame.save((err, game) => {
	  	if(err) res.status(400).send(err)

	  	res.json({message: "Game successfully added!", game})
	  });
	});

router.route('/:id')
	.get(function(req, res) {
	  res.send('respond with a resource');
	})
	.put(function(req, res) {
	  res.send('give me an updated resource');
	})
	.delete(function(req, res) {
	  res.send('this should remove a resource');
	});

module.exports = router;
