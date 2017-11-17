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

//use mongoose to connect to a database
mongoose.connect('mongodb://localhost', { useMongoClient: true });

/*var hand = [{"id": "01", "cards": [{"suit": "spades", "rank": "a"},
                                  {"suit": "spades", "rank": "10"},
                                  {"suit": "hearts", "rank": "7"},
                                  {"suit": "clubs",  "rank": "10"},
                                  {"suit": "spades", "rank": "9"}]}];*/

//make schema to input data
var handSchema = mongoose.Schema({
  handId: String,
  cards: String
});

var hand = mongoose.model("hand", handSchema);

//get to find hands and print hand id and array of cards
app.get('/hands/:handId', function (req, res) {
  hand.find({"handId":req.body.id}, function(err, hands){
    if (err !== null){
      res.status(404).send('No hand was found with id: '+ hand);
    }
    else{
      res.status(200).json(hands);
      res.send(hands);
    }
  })
});

//get to find cards and just display the array
app.get('/hands/:handId/cards', function (req, res) {
  hand.find({"handId": req.body.id}, 'cards':[]), function(err, cards){
    if (err !== null){
      res.status(404);
    }
    else{
      res.status(200).send(cards);
    }
  })
  //res.status(200).send(hand);
});

//post to add a new array of 5 cards
app.post('/hands', function (req, res){
  var newhand = new hand({"id":req.body.id, "cards": [req.body.cards,
                                                      req.body.cards,
                                                      req.body.cards,
                                                      req.body.cards,
                                                      req.body.cards]});
  newhand.save(function (err, result){
    if (err !== null){
      console.log(err);
      res.send("ERROR");
    }
    else{
      res.status(200).send(result);
    }
  })
});

//put to update an existing array or cards
app.put('/hands', function (req, res){
  console.log(req.body);
  var newhand = new hand({"id":req.body.id, "cards": [req.body.cards,
                                                      req.body.cards,
                                                      req.body.cards,
                                                      req.body.cards,
                                                      req.body.cards]});
  newhand.save(function (err, result){
    if (err !== null) {
      console.log(err);
      res.send("ERROR");
    }
    else {
      res.stuatus(200).json(result);
    }
  });
});

//listen to let user know the app is running on port 3000
app.listen(3000, function (){
  console.log('Poker app listening on port 3000');
});
