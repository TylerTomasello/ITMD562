/* Tyler Tomasello
*  server.js
*  Week 10 assignment-week10
*  10/31/17
*
* Useful links I used for guidence:
*  https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd
*  http://mongoosejs.com/docs/queries.html
*/

//required items to run properly
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

app.use(bodyParser.json());

var mongoUri = 'mongodb://localhost:27017/user';
//use mongoose to connect to a database
mongoose.connect(mongoUri, {useMongoClient: true});

//make schema to input data
var userSchema = mongoose.Schema({
  name : String,
  email : String,
  reminder : [{
    title : String,
    description : String,
    created : String
  }]
});

var user = mongoose.model('user', userSchema);


//get to find usersId and displaying name and email
app.get('/users/:userId', function (req, res) {
  user.findById(req.params.userId, function (err, user){
    if (err){
      res.status(404).send(err);
    }
    else {
      res.status(200).send({
        'name' : user.name,
        'email' : user.email
      });
    }
  });
});

//get to find reminders of a user and display the reminder title and description
app.get('/users/:userId/reminders', function (req, res) {
  user.findById(req.params.userId, function(err, user) {
    if (err) {
      res.status(404).send(err);
    }
    else {
      user.findOne({'_id' : req.params.userId, 'reminder.title' : req.query.title},
      'reminder.title', function (err, user) {
        if (err) {
          res.status(404).send(err);
        }
        else {
          res.status(200).send(user.reminder);
        }
      });
    }
  });
});

//get to find a specific reminder and display the title description and created
app.get('/users/:userId/reminders/:reminderId', function (req, res) {
  user.findById(req.params.userId, function (err, user) {
    if (err){
      res.status(404).send(err);
    }
    else {
      res.status(200).send({
        'title' : reminder.title,
        'description' : reminder.description,
        'creeated' : reminder.created
      });
    }
  });
});

//post to create a new user and input the name and email
app.post('/users', function (req, res) {
  var new_user=new user({
    name : req.body.name,
    email : reeq.body.email
  });
  new_user.save(function (err, user) {
    if (err) {
      res.status(404).send(err);
    }
    else {
      res.status(200).send(user);
    }
  });
});

//post to create a new reminder for a user with a title and description.
//The time is automatically put in
app.post('/users/:userId/reminders', function (req, res) {
  var current=new Date();
  //array of current month, date, and year
  var date=[current.getMonth() + 1, current.getDate(), current.getFullYear()];
  //array of current hour, minutes, and seconds
  var time=[current.getHours(), current.getMinutes(), current.getSeconds()];
  //if sec and min are less then 10 put a 0 in fron of it
  for (var i = 1; i < 3; i++) {
    if (time[i] < 10) {
      time[i]= "0" + time[i];
    }
  }
  //variable for the timestamp to be used
  var timestamp = date.join("-") + " " + time.join(":") ;

  var new_reminder={
    title : req.body.title,
    description : req.body.description,
    created : timestamp
  };

  user.findById(req.params.userId, function (err, user) {
    if (err) {
      res.status(404).send(err);
    }
    else {
      var reminder = user.reminder.create(new_reminder);
      user.reminder.push(reminder);
      user.save(function (err, user) {
        if (err) {
          res.status(404).send(err);
        }
        else {
          res.status(200).send(reminder);
        }
      });
    }
  });
});

//delete to remove the user and all reminders that go with it
app.delete('/users/:userId', function (req,res){
  user.remove({_id : req.params.userId}, function (err, user) {
    if (err) {
      res.status(404).send(err);
    }
    else {
      res.status(204).send({message : 'User deleted'});
    }
  });
});

//delete to remove all the reminders from a given user
app.delete('/users/:userId/reminders', function (req,res){
  user.findById(req.params.userId, function(err, user) {
    if (err) {
      res.status(404).send(err);
    }
    else {
      user.reminder.remove({_id : req.params.userId}, function (err, user) {
        if (err) {
          res.status(404).send(err);
        }
        else {
          res.status(204).send({message : 'Reminders deleted'});
        }
      });
    }
  });
});

//delete to remove one specific reminder at given user and reminder
app.delete('/users/:userId/reminders/reminderId', function (req,res){
  user.findById(req.params.userId, function(err, user) {
    if (err) {
      res.status(404).send(err);
    }
    else {
      user.reminder.pull(req.params.reminderId);
      user.save(function(err, user) {
        if (err) {
          res.status(404).send(err);
        }
        else {
          res.status(204).send({message : 'Reminder deleted'});
        }
      });
    }
  });
});

//listen to let user know the app is running on port 3000
app.listen(3000, function (){
  console.log('User app listening on port 3000');
});

//end user program
