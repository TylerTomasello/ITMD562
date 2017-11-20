/* Tyler Tomasello
*  server.js
*  Week 7 assignment-week
*  10/10/17
*/
var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

//use mongoose to connect to a database
mongoose.connect('mongodb://localhost:27017/hand', { useMongoClient: true });

/*var hand = [{"id": "01", "cards": [{"suit": "spades", "rank": "a"},
                                  {"suit": "spades", "rank": "10"},
                                  {"suit": "hearts", "rank": "7"},
                                  {"suit": "clubs",  "rank": "10"},
                                  {"suit": "spades", "rank": "9"}]}];*/

//make schema to input data
var handSchema = mongoose.Schema({
  cards: {
    type: []
  }
});

var hand = mongoose.model("hand", handSchema);

//get to find hands and print hand id and array of cards
app.get('/hands/:handId', function (req, res) {
  hand.findById(req.params.handId).then(function(hand){
    res.send({
      'id':hand._id,
      'cards': hand.cards
    });
  }, function(err){
  res.status(404).send(err);
  }
});

//get to find cards and just display the array
app.get('/hands/:handId/cards', function (req, res) {
  hand.findById({_id: req.params.handId}, 'cards').then(function(hand){
    res.send(hand.cards);
  }, function(err){
  res.status(404).send(err);
  }
});

//post to add a new array of 5 cards
app.post('/hands', function (req, res){
  var hand = new hand();
  hand.cards = req.body;

  hand.save().then(function (doc){
    res.status(200);
    res.json({
      'id': doc._id
    })
  }, function (err){
    res.send(err);
  });
});

//put to update an existing array or cards
app.put('/hands/:handId', function (req, res){
  hand.update({ _id : req.body}, $set : {cards : req.body},
  function(err){
    if(err){
      res.status(404).send(err);
    }
    else{
      res.status(204).send();
    }
  });
});

//listen to let user know the app is running on port 3000
app.listen(3000, function (){
  console.log('Poker app listening on port 3000');
});
