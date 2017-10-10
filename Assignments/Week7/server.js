var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var app = express();

//app.use(express.bodyParser());

mongoose.connect('mongodb://localhost/poker', {
  useMongoClient: true,
});

/*var hand = [{"id": "01", "cards": [{"suit": "spades", "rank": "a"},
                                  {"suit": "spades", "rank": "10"},
                                  {"suit": "hearts", "rank": "7"},
                                  {"suit": "clubs",  "rank": "10"},
                                  {"suit": "spades", "rank": "9"}]}];*/
var handSchema = mongoose.Schema({
  id: String,
  cards: [String]
});

var hand = mongoose.model("hand", handSchema);

//http.createServer[app].listen(3000);

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

/*app.get('/', function (req, res) {
  res.send('Hello World!');
});*/

app.post('/hands', function (req, res){
  console.log(req.body);
  var newhand = new hand({"id":req.body.id, "cards": req.body.cards});
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

app.put('/hands', function (req, res){
  console.log(req.body);
  var newhand = new hand({"id":req.body.id, "cards": req.body.cards});
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

app.listen(3000, function (){
  console.log('Poker app listening on port 3000');
});
