/*const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;*/

const express = require('express')
const app = express()

	app.get('/', function (req, res) {
		  res.send('Hello World!')
	})

app.post('/', function(req, res) {
	res.send('You POST to me')
})

app.listen(3000, function () {
	  console.log('Example app listening on port 3000!')
	});
