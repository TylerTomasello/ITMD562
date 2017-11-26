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

  var viewusers = function () {
    $.get("http://localhost:3000/users", function(data, status){
      var $display = $("<p>");
      $display.text(JSON.stringify(data));
      $(".display").html($display);
    });
  }

  //Add a new user
  var adduser = function ($name, $email) {
    var newUser =   {'user' : {
      "name" : $name,
      "email" : $email
    }};
    $.post("http://localhost:3000/users", JSON.stringify(newUser),
    function(req, res){
      var $display = $("<p>");
      $display.text("New User Id: " + req.id);
      $(".display").html($display);
    }, "json");
  }

  //Add a new reminder to a user
  var addreminder = function ($title, $des, $id) {
    var newRemind  =   {"reminder" : {
      "title" : $title,
      "description" : $des
    }};
    $.post("http://localhost:3000/users/"+ $id +"/reminders", JSON.stringify(newRemind),
    function(req, res){
      var $display = $("<p>");
      $display.text("New Reminder Id: " + req.id);
      $(".display").html($display);
    });
  }

  //Find a user by entering userid
  var searchuser = function ($id) {
    $.get("http://localhost:3000/users/" + $id, function(info, status){
      var $display = $("<p>");
      $display.text("Username: " + info.name + " Email: " + info.email);
      $(".display").html($display);
    });
  }

  //Find a specific reminder by entering userid and reminderid
  var searchreminder = function ($iduser, $idrem) {
    $.get("http://localhost:3000/users/" + $iduser + "/reminders/" + $idrem, function(info, status){
      var $display = $("<p>");
      $display.text("Title: " + info.title + " Description: " + info.description + " Created: " + info.created);
      $(".display").html($display);
    });
  }

  //Find and display all reminders for a user
  var viewreminders = function ($id) {
    $.get("http://localhost:3000/users/" + $id + "/reminders", function(info, status){
      info.forEach(function (each) {
        var $display = $("<li>");
        $display.text("Title: " + each.title + " Description: " + each.description + " Created: " + each.created)
        $(".display").append($display);
      });
    });
  }

  //Delete a user
  var deleteuser = function ($iduser) {
    $.ajax({
      url: "http://localhost:3000/users/" + $iduser,
      type: 'DELETE',
      data: "{}",
      contentType: "json",
      success: function(req) {
        var $display = $("<p>");
        $display.text("User Id: " + $iduser + " is deleted");
        $(".display").html($display);
      }
    });
  }

  //Delete all reminders from a user
  var deletereminders = function ($iduser) {
    $.ajax({
      url: "http://localhost:3000/users/" + $iduser + "/reminders",
      type: 'DELETE',
      data: "{}",
      contentType: "json",
      success: function(req) {
        var $display = $("<p>");
        $display.text("All reminders have been deleted for User Id: " + $iduser);
        $(".display").html($display);
      }
    });
  }

  //Delete a reminder from a user
  var deletereminder = function ($iduser, $idrem) {
    $.ajax({
      url: "http://localhost:3000/users/" + $iduser + "/reminders/" + $idrem,
      type: 'DELETE',
      data: "{}",
      contentType: "json",
      success: function(req) {
        var $display = $("<p>");
        $display.text("Reminder Id: " + $idrem + " has been deleted");
        $(".display").html($display);
      }
    });
  }

  $(".clear").on("click", function() {
    $(".display").html("");
    $(".input").val("");
  });

  $("#viewusers button").on("click", function() {
    viewusers();
  });

  $("#searchuser button").on("click", function() {
    var $field1 = $(".searchuser");
    var $id = $field1.val();
    $field1.val("");
    searchuser($id);
  });

  $("#adduser button").on("click", function() {
    var $field1 = $(".addname");
    var $field2 = $(".addemail");
    var $name = $field1.val();
    var $email = $field2.val();
    $field1.val("");
    $field2.val("");
    adduser($name, $email);
  });

  $("#viewreminders button").on("click", function() {
    var $field1 = $(".viewreminder");
    var $id = $field1.val();
    $field1.val("");
    viewreminders($id);
  });

  $("#addreminder button").on("click", function() {
    var $field1 = $(".addtitle");
    var $field2 = $(".adddes");
    var $field3 = $(".userid");
    var $title = $field1.val();
    var $des = $field2.val();
    var $id = $field3.val();
    $field1.val("");
    $field2.val("");
    $field3.val("");
    addreminder($title, $des, $id);
  });

  $("#searchreminder button").on("click", function() {
    var $field1 = $(".search");
    var $field2 = $(".searchrem");
    var $iduser = $field1.val();
    var $idrem = $field2.val();
    $field1.val("");
    $field2.val("");
    searchreminder($iduser, $idrem);
  });

  $("#deletereminder button").on("click", function() {
    var $field1 = $(".deluser");
    var $field2 = $(".delremid");
    var $iduser = $field1.val();
    var $idrem = $field2.val();
    $field1.val("");
    $field2.val("");
    deletereminder($iduser, $idrem);
  });

  $("#deleteuser button").on("click", function() {
    var $field1 = $(".deluserid");
    var $iduser = $field1.val();
    $field1.val("");
    deleteuser($iduser);
  });

  $("#deleteall button").on("click", function() {
    var $field1 = $(".delall");
    var $iduser = $field1.val();
    $field1.val("");
    deletereminders($iduser);
  });
});
