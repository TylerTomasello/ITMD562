/* Tyler Tomasello
*  app.js
*  Week 11 assignment-week11
*  11/7/17
*
*References: https://www.w3schools.com/jquery/jquery_ajax_get_post.asp
*/

$(document).ready(function() {
  "use strict";
  $.ajaxSetup({
    contentType: "application/json; charset=utf-8"
  });

  //POST USER
  $("#addUser button").on("click", function() {
    var $input1 = $(".name");
    var $input2 = $(".email");
    var $name = $input1.val();
    var $email = $input2.val();
    $input1.val("");
    $input2.val("");

    var newUser =   {'user' : {
      "name" : $name,
      "email" : $email
    }};
    $.post("/users", JSON.stringify(newUser) , function(req, res){
      var $display = $("<p>");
      $display.text("User Id: " + req.id);
      $(".display").html($display);

    }, "json");
  });

  //POST REMINDER
  $("#addReminder button").on("click", function() {
    var $input1 = $(".userid");
    var $input2 = $(".title");
    var $input3 = $(".description");
    var $userid = $input1.val();
    var $title = $input2.val();
    var $description = $input3.val();
    $input1.val("");
    $input2.val("");
    $input3.val("");

    var newRemind  =   {"reminder" : {
      "title" : $title,
      "description" : $description
    }};
    $.post("/users/"+ $userid +"/reminders", JSON.stringify(newRemind) , function(req, res){
      var $display = $("<p>");
      $display.text("New reminderID: " + req.id);
      $(".display").html($display);
    });
  });

  //Get specific user
  $("#findUser button").on("click", function() {
    var $input1 = $(".userid");
    var $userid = $input1.val();
    $input1.val("");
    $.get("/users/" + $userid, function(data){
      var $display = $("<p>");
      $display.text("Username: " + data.name + " Email: " + data.email);
      $(".display").html($display);
    });
  });

  //GET REMINDER
  $("#findReminder button").on("click", function() {
    var $input1 = $(".userid");
    var $input2 = $(".reminderid");
    var $userid = $input1.val();
    var $reminderid = $input2.val();
    $input1.val("");
    $input2.val("");
    $.get("/users/" + $userid + "/reminders/" + $reminderid, function(data){
      var $display = $("<p>");
      $display.text("Title: " + data.title + " Description: " + data.description + " Created: " + data.created);
      $(".display").html($display);
    });
  });

  //GET ALL USER REMINDERS
  $("#findReminders button").on("click", function() {
    var $input1 = $(".userid");
    var $userid = $input1.val();
    $input1.val("");
    $.get("/users/" + $userid + "/reminders", function(data){
      data.forEach(function (des){
        var $display = $("<li>");
        $display.text("Title: " + des.title + " Description: " + des.description + " Created: " + des.created);
        $(".display").append($display);
      });
    });
  });

  //DELETE USER
  $("#deleteUser button").on("click", function() {
    var $input1 = $(".userid");
    var $userid = $input1.val();
    $input1.val("");

    $.ajax({
      url: "/users/" + $userid,
      type: 'DELETE',
      data: "{}",
      contentType: "application/json",
      success: function(req) {
        var $display = $("<p>");
        $display.text("userId: " + $userid + " has been deleted");
        $(".display").html($display);
      }
    });
  });

  //DELETE ALL USER REMINDERS
  $("#deleteReminders button").on("click", function() {
    var $input1 = $(".userid");
    var $userid = $input1.val();
    $input1.val("");

    $.ajax({
      url: "/users/" + $userid + "/reminders",
      type: 'DELETE',
      data: "{}",
      contentType: "application/json",
      success: function(req) {
        var $display = $("<p>");
        $display.text("All reminders have been deleted for user Id: " + $userid);
        $(".display").html($display);
      }
    });
  });

  //DELETE SINGLE REMINDER
  $("#deleteReminder button").on("click", function() {
    var $input1 = $(".userid");
    var $input2 = $(".reminderid");
    var $userid = $input1.val();
    var $reminnderid = $input2.val();
    $input1.val("");
    $input2.val("");

    $.ajax({
      url: "/users/" + $userid + "/reminders/" + $reminderid,
      type: 'DELETE',
      data: "{}",
      contentType: "application/json",
      success: function(req) {
        var $display = $("<p>");
        $display.text("Reminder Id: " + $reminderid + " has been deleted");
        $(".display").html($display);
      }
    });
  });
});
