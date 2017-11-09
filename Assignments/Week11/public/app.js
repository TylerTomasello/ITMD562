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

  //Add a new user
  $("#addUser button").on("click", function() {
    var $name = $(".name").val();
    var $email = $(".email").val();
    $(".name").val("");
    $(".email").val("");

    var newUser =   {'user' : {
      "name" : $name,
      "email" : $email
    }};
    /*
    $.ajax({
      url: "/users/",
      type: "POST",
      data: JSON.stringify(newUser),
      contentType: "application/json",
      success: function(req) {
        var $display = $("<p>");
        $display.text("Id: " + req.id);
        $(".display").html($display);
      }
    });
    */
    $.post("/users", JSON.stringify(newUser) , function(req, res){
      var $display = $("<p>");
      $display.text("Id: " + req.id);
      $(".display").html($display);

    }, "json");
  });

  //Add a new reminder to a user
  $("#addReminder button").on("click", function() {
    var $userid = $(".userid").val();
    var $title = $(".title").val();
    var $description = $(".description").val();
    $(".userid").val("");
    $(".title").val("");
    $(".description").val("");

    var newReminder  =   {"reminder" : {
      "title" : $title,
      "description" : $description
    }};
    /*
    $.ajax({
      url: "/users/" + $userid + "/reminders",
      type: "POST",
      data: JSON.stringify(newReminder),
      contentType: "application/json",
      success: function(req) {
        var $display = $("<p>");
        $display.text("Id: " + req.id);
        $(".display").html($display);
      }
    });
    */
    $.post("/users/" + $userid + "/reminders", JSON.stringify(newReminder) , function(req, res){
      var $display = $("<p>");
      $display.text("Id: " + req.id);
      $(".display").html($display);
    });
  });

  //Find a user by entering userid
  $("#findUser button").on("click", function() {
    var $userid = $(".userid").val();
    $(".userid").val("");
    /*
    $.ajax({
      url: "/users/" + $userid,
      type: "GET",
      data: "{}",
      contentType: "application/json",
      success: function(req) {
        function(data){
          var $display = $("<p>");
          $display.text("Name: " + data.name + " Email: " + data.email);
          $(".display").html($display);
        }
      }
    });
    */
    $.get("/users/" + $userid, function(data){
      var $display = $("<p>");
      $display.text("Name: " + data.name + " Email: " + data.email);
      $(".display").html($display);
    });
  });

  //Find a specific reminder by entering userid and reminderid
  $("#findReminder button").on("click", function() {
    var $userid = $(".userid").val();
    var $reminderid = $(".reminderid").val();
    $(".userid").val("");
    $(".reminderid").val("");
    /*
    $.ajax({
      url: "/users/" + $userid + "/reminders" + $reminderid,
      type: "GET",
      data: "{}",
      contentType: "application/json",
      success: function(req) {
        function(data){
          var $display = $("<p>");
          $display.text("Title: " + data.title + " Description: " + data.description + " Created: " + data.created);
          $(".display").html($display);
        }
      }
    });
    */
    $.get("/users/" + $userid + "/reminders/" + $reminderid, function(data){
      var $display = $("<p>");
      $display.text("Title: " + data.title + " Description: " + data.description + " Created: " + data.created);
      $(".display").html($display);
    });
  });

  //Find and display all reminders for a user
  $("#findReminders button").on("click", function() {
    var $userid = $(".userid").val();
    $(".userid").val("");
    /*
    $.ajax({
      url: "/users/" + $userid + "/reminders",
      type: "GET",
      data: "{}",
      contentType: "application/json",
      success: function(req) {
        function(data){
          data.forEach(function (des){
            var $display = $("<li>");
            $display.text("Title: " + des.title + " Description: " + des.description + " Created: " + des.created);
            $(".display").append($display);
          });
        }
      }
    });
    */
    $.get("/users/" + $userid + "/reminders", function(data){
      data.forEach(function (des){
        var $display = $("<li>");
        $display.text("Title: " + des.title + " Description: " + des.description + " Created: " + des.created);
        $(".display").append($display);
      });
    });
  });

  //Delete a user
  $("#deleteUser button").on("click", function() {
    var $userid = $(".userid").val();
    $(".userid").val("");

    $.ajax({
      url: "/users/" + $userid,
      type: "DELETE",
      data: "{}",
      contentType: "application/json",
      success: function(req) {
        var $display = $("<p>");
        $display.text("User has been deleted");
        $(".display").html($display);
      }
    });
  });

  //Delete all reminders from a user
  $("#deleteReminders button").on("click", function() {
    var $userid = $(".userid").val();
    $(".userid").val("");

    $.ajax({
      url: "/users/" + $userid + "/reminders",
      type: "DELETE",
      data: "{}",
      contentType: "application/json",
      success: function(req) {
        var $display = $("<p>");
        $display.text("All reminders have been deleted.");
        $(".display").html($display);
      }
    });
  });

  //Delete a reminder from a user
  $("#deleteReminder button").on("click", function() {
    var $userid = $(".userid").val();
    var $reminnderid = $(".reminderid").val();
    $(".userid").val("");
    $(".reminderid").val("");

    $.ajax({
      url: "/users/" + $userid + "/reminders/" + $reminderid,
      type: "DELETE",
      data: "{}",
      contentType: "application/json",
      success: function(req) {
        var $display = $("<p>");
        $display.text("Reminder has been deleted");
        $(".display").html($display);
      }
    });
  });
});
