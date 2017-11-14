/* Tyler Tomasello
*  server.js
*  Week 12 assignment8
*  11/14/17
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

//declare starting array to use for information
var user = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

//allow for use local files, with indesx.html, and rest commands
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,  X-HTTP-Method-Override, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});

//get to find usersId and displaying name and email
app.get('/users/:userId', function (req, res) {
  var userID = req.params.userId;

  if (!user[userID - 1]){
    res.status(404);
    res.json({"message" : "User not found for id: " + userID});
    }
  else {
    res.status(200);
    res.json(user[userID - 1].user);
  }
});

//get to find reminders of a user and display the reminder title and description
app.get('/users/:userId/reminders', function (req, res) {
  var userID = req.params.userId;

  if (!user[userID - 1]) {
    res.status(404);
    res.json({"message" : "User not found for id: " + userID});
  }
  /*
  else if (remind[title=reminders]) {
    res.status(200).send(reminds[title]);
  }
  */
  else {
    var reminds = [];
    user[userID - 1].remind.forEach(function (items) {
      reminds.push(items.reminder);
    });
    res.status(200);
    res.json(reminds);
  }
});

//get to find a specific reminder and display the title description and created
app.get('/users/:userId/reminders/:reminderId', function (req, res) {
  var userID = req.params.userId;
  var reminderID = req.params.reminderId;

  if (!user[userID - 1].remind[reminderID - 1]){
    res.status(404);
    res.json({"message" : "Reminder not found for id: " + reminderID});
  }
  else {
    res.status(200);
    res.json(user[userID - 1].remind[reminderID - 1].reminder);
  }
});

//post to create a new user and input the name and email
app.post('/users', function (req, res) {
  var useid = {'id' : user.length+1};
  var users = req.body;

  users.id = useid.id;

  //declare empty array if reminders will be put in later
  users.remind = [];
  user.push(users);
  res.status(200);
  res.json(useid);
});

//post to create a new reminder for a user with a title and description.
//The time is automatically put in
app.post('/users/:userId/reminders', function (req, res) {
  var userID = req.params.userId;


  var current = new Date();
  //array of current month, date, and year
  var date = [current.getMonth() + 1, current.getDate(), current.getFullYear()];
  //array of current hour, minutes, and seconds
  var time = [current.getHours(), current.getMinutes(), current.getSeconds()];
  //if sec and min are less then 10 put a 0 in fron of it
  for (var i = 1; i < 3; i++) {
    if (time[i] < 10) {
      time[i]= "0" + time[i];
    }
  }
  //variable for the timestamp to be used
  var timestamp = date.join("-") + " " + time.join(":") ;

  if (!user[userID-1]) {
    res.status(404);
    res.json({"message" : "User not found for id: " + userID});
  }
  else {
    var remid = {'id' : user[userID-1].remind.length+1};
    var new_reminder = req.body;
    new_reminder.id = remid.id;
    new_reminder.reminder.created = timestamp;

    user[userID-1].remind.push(new_reminder);
    res.status(200);
    res.json(remid);
  }
});

//delete to remove the user and all reminders that go with it
app.delete('/users/:userId', function (req,res){
  var userID = req.params.userId;

  if (!user[userID-1]) {
    res.status(404);
    res.json({"message" : "User not found for id: " + userID});
  }
  else {
    delete user[userID - 1];
    res.status(204);
    res.send('204 No content');
  }
});

//delete to remove all the reminders from a given user
app.delete('/users/:userId/reminders', function (req,res){
  var userID = req.params.userId;

  if (!user[userID-1]) {
    res.status(404);
    res.json({"message" : "User not found for id: " + userID});
  }
  else {
    user[userID-1].remind = [];
    res.status(204);
    res.send('204 No content');
  }
});

//delete to remove one specific reminder at given user and reminder
app.delete('/users/:userId/reminders/:reminderId', function (req,res){
  var userID = req.params.userId;
  var reminderID = req.params.reminderId;

  if (!user[userID-1].remind[reminderID-1]) {
    res.status(404);
    res.json({"message" : "Reminder not found for id: " + reminderID});
  }
  else {
    //user[userID-1].remind.pull(reminderID-1);
    delete user[userID-1].remind[reminderID-1];
    res.status(204);
    res.send('204 No content');
  }
});

//listen to let user know the app is running on port 3000
app.listen(3000, function (){
  console.log('User app listening on port 3000');
});

module.exports = app;
