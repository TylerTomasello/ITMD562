/* Tyler Tomasello
*  server.js
*  Week 11 assignment-week10
*  11/7/17
*
* Useful links I used for guidence:
*  https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd
*  http://mongoosejs.com/docs/queries.html
*/

//required items to run properly
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

//declare starting array to use for information
var user = [];

//get to find usersId and displaying name and email
app.get('/users/:userId', function (req, res) {
  var userID = req.params.userId;

  if (!user[userID-1]){
    res.status(404).send("User not found for id: " + userID);
    }
  else {
    res.status(200).send(user[userID-1].user);
  }
});

//get to find reminders of a user and display the reminder title and description
app.get('/users/:userId/reminders', function (req, res) {
  var userID = req.params.userId;
  var reminds = [];

  if (!user[userID-1]) {
    res.status(404).send("User not found for id: " + userID);
  }
  /*
  else if (remind[title=reminders]) {
    res.status(200).send(reminds[title]);
  }
  */
  else {
    user[userID-1].remind.forEach(function (item) {
      reminds.push(item.reminder);
    });
    res.status(200).send(reminds);
  }
});

//get to find a specific reminder and display the title description and created
app.get('/users/:userId/reminders/:reminderId', function (req, res) {
  var userID = req.params.userId;
  var reminderID = req.params.reminderId;

  if (!user[userID-1].remind[reminderID-1]){
    res.status(404).send("Reminder not found for id: " + reminderID);
  }
  else {
    res.status(200).send(user[userID-1].remind[reminderID-1].reminder);
  }
});

//post to create a new user and input the name and email
app.post('/users', function (req, res) {
  var useid = {'id' : user.length+1};
  var users = req.body;
