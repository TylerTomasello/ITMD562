/*        GET /users/{userId}
            Must return a 200 with ONLY the relevant user information ( i.e. { "name" : "My Name", "email" : "my@email.com" } )
            Return 404 if not found
        GET /users/{userId}/reminders
            Must return a 200 with ONLY the relevant user's reminders as an array ( i.e. [{ "title" : "MyTItle", "description" : "My Desc", "created" : <<created_timestamp> }])
            Return 404 if not found
            GRAD STUDENTS MUST ALSO IMPLEMENT TITLE FILTERING
                If query param "title" is present, only return reminders which match that title exactly (i.e. GET /users/{userId}/reminders?title=My%20Title )
        GET /users/{userId}/reminders/{reminderId}
            Must return a 200 with ONLY the relevant user's reminder as a single object ( i.e. { "title" : "My TItle", "description" : "My Desc", "created" :< <created_timestamp> })
            Return 404 if not found
        POST /users
            Must create a user given the user input model defined below
            Content-Type must be application-json
            Return 200 along with ONLY the new user id upon success (i.e. { "id" : <someId> } )
        POST /users/{userId}/reminders
            Must create a reminder given the reminder input model defined below (i.e. user does not provide created timestamp on creation)
            Content-Type must be application-json
            Return 200 along with ONLY the new reminder id upon success (i.e. { "id" : <someId> } )
        DELETE /users/{userId}
            Must delete the user at the given id along with all of their reminders
            Return 204 No Content upon success
            Return 404 if user doesn't exist
        DELETE /users/{userId}/reminders
            Must delete all the reminders for the user at the given id
            Return 204 No Content upon success
            Return 404 if user doesn't exist
        DELETE /users/{userId}/reminders/{reminderId}

            Must delete the specified reminder for the user at the given id
            Return 204 No Content upon success
            Return 404 if user or reminder doesn't exist
*/

var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.get('/users/:userId', function (req, res) {
  var userId=req.params.userId;
  if(!users[userid-1]){
    res.status(404).send('No user was found with id');
  }
  else{
    res.status(200).send(users[userId-1]);
  }
});
