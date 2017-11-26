var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let games = Game.find({}) ;
  games.exec((err, games) => {
    res.render('index', { title: 'Express2', games: });
  });
});

module.exports = router;
