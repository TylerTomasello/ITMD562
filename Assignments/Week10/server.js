
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

app.use(bodyParser.json());

//use mongoose to connect to a database
mongoose.connect('mongodb://localhost:27017/user');

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
      }
    }
  });
});

app.listen(3000, function (){
  console.log('User app listening on port 3000');
});
