const express = require('express')
const http = require("http")
const app = express()

var hand = {"id": "01", "cards": [{"suit": "spades", "rank": "a"}]}

app.get('/hands/:handId', function (req, res) {
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
