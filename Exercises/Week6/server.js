var http = require('http');
var redis = require('redis');
var redisClient = redi.createClient();

var counter;
rdisClient.get("counter", function(err, value){
  counter = parseInt(value, 10);
});

http.createServer(function (req, res) {
  redis.Client.incr(counter);
  res.writeHead(200, {'Content-type': 'text/plain'});
  res.edn('Hello World!\n Counter: ' + counter);

})
