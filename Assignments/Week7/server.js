const express = require('express')
const http = require("http")
const app = express()

var hand = {"id": "01", "cards": [{"suit": "spades", "rank": "a"},
                                  {"suit": "spades", "rank": "10"},
                                  {"suit": "hearts", "rank": "7"},
                                  {"suit": "clubs",  "rank": "10"},
                                  {"suit": "spades", "rank": "9"}]}

app.get('/', function (req, res) {
  res.status(200).send(hand)
});

/*app.get('/hands/:handId/cards', function (req, res) {
  res.send('Hello World!')
});*/

app.post('/hands', function (req, res){

})

app.listen(3000, function (){
  console.log('Example app listening on port 3000')
});
