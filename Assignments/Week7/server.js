/* Tyler Tomasello
*  Week 7 assignment-week
*  10/10/17
*/
var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var app = express();

//app.use(express.bodyParser());

//use mongoose to connect to a database
mongoose.connect('mongodb://localhost/poker', {
  useMongoClient: true,
});

/*var hand = [{"id": "01", "cards": [{"suit": "spades", "rank": "a"},
                                  {"suit": "spades", "rank": "10"},
                                  {"suit": "hearts", "rank": "7"},
                                  {"suit": "clubs",  "rank": "10"},
                                  {"suit": "spades", "rank": "9"}]}];*/

//make schema to input data
var handSchema = mongoose.Schema({
  id: String,
  cards: [String]
});

var hand = mongoose.model("hand", handSchema);

//get to find hands and print hand id and array of cards
app.get('/', function (req, res) {
  hand.find({}, function(err, hands){
    if(err !== null){
    res.status(404);
    }
    else{
    res.status(200).json(hands);
    }
  })
  //res.status(200).send(hand);
});

//get to find cards and just display the array
app.get('/', function (req, res) {
  hand.find({}, function(err, cards){
    if(err !== null){
    res.status(404);
    }
    else{
    res.status(200).json(cards);
    }
  })
  //res.status(200).send(hand);
});

//post to add a new array of 5 cards
app.post('/hands', function (req, res){
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
