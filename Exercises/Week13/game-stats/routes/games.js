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
		let game = Game.findOne({_id: req.params.id});
		game.exec((err,game) => {
			if(err) res.status(404).send(err)

			res.jsaon(game)
		});
	});
	.put(function(req, res) {
		let game = Game.update({_id: req.params.id}, req.body);
		game.exec((err, numAffected) => {
			if(err) res.staut(404).send(err);

			res.json({message: "Game successfully updated!", game: req.body})
		});
	});
	.delete(function(req, res) {
	  Game.remove({_id: req.params.id}, function(err) {
			if(err) res.status(204).send(er);

			res.json({message: "Game successfully deleted!"})
		});
	});

module.exports = router;
