/*const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;*/

const express = require('express')
const app = express()

var todos = [
	{
		"description" : "My first description",
		"tag" : "first"
	},
	{
		"description" : "My second description",
		"tag" : "second"
	}
]


app.get('/todos', function (req, res) {
	res.json(todos)
	})

app.post('/todos', function(req, res) {
	var newToDo = req.body;

	todos.push(todos)
	res.json("message" : "You did it")
})

app.listen(3000, function () {
	  console.log('Example app listening on port 3000!')
	});
