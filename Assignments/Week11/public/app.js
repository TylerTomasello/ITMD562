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
  $("#addUserBtn").on("click", function() {
    var newName = $("#nameInput").val();
    var newEmail = $("#emailInput").val();

    var user =   {'user' : {
      name : newName,
      email : newEmail
    }};

    console.log(user);
    $.ajax({
      url: "http://localhost:3000/users/",
      type: "POST",
      data: JSON.stringify(newUser),
      contentType: "application/json",
      success: function(res, status) {
        var $result = $("<p>");
        $result.text("Id: " + res.userId + " Name: " + user.user.name +
        " Email: " + user.user.email);
        $("#userContainer").html($result);
      }
    });
  });

  //Add a new reminder to a user
  $("#addReminBtn").on("click", function() {
    var userId = $("#addReminUserInput").val();
    var newTitle = $("#titInput").val();
    var newDescription = $("#descInput").val();

    var newReminder  =   {"reminder" : {
      "title" : newTitle,
      "description" : newDescription
    }};

    $.ajax({
      url: "http://localhost:3000//users/" + userId + "/reminders",
      type: "POST",
      data: JSON.stringify(newReminder),
      contentType: "application/json",
      success: function(res, status) {
        var $result = $("<p>");
        $result.text("Id: " + res.reminderId + " Title: " + res.reminder.title +
        " Description: " + res.reminder.description);
        $("#reminContainer").html($result);
      }
    });
  });

  //Find a user by entering userid
  $("#getUserBtn").on("click", function() {
    var userId = $("#userIdInput").val();

    $.ajax({
      url: "http://localhost:3000//users/" + userId,
      type: "GET",
      success: function(getUSer, status) {
        var $result = $("<p>");
        $result.text("Name: " + getUser.name + " Email: " + getUSer.email);
        $("searchedUser").html($result);
      }
    });
  });

  //Find a specific reminder by entering userid and reminderid
  $("#getReminderBtn").on("click", function() {
    var userId = $("#getReminUserIdInput").val();
    var reminderId = $("#getReminIdInput").val();

    $.ajax({
      url: "http://localhost:3000//users/" + userId + "/reminders" + reminderId,
      type: "GET",
      success: function(res, status) {
        var $result = $("<p>");
        $result.text("Title: " + res.title + " Description: " + res.description +
        " Created: " + res.created);
        $("#searchedReminder").html($result);
      }
    });
  });

  //Find and display all reminders for a user
  $("#getAllBtn").on("click", function() {
    var userId = $("#getAllReminUserInput").val();

    $.ajax({
      url: "http://localhost:3000//users/" + userId + "/reminders",
      type: "GET",
      success: function(res, status) {
        $("#allContainer").empty();
        res.forEach(function (reminders){
          var $result = $("<p>");
          $result.text("Title: " + reminders.title + " Description: " + reminders.description +
          " Created: " + reminders.created);
          $("#allContainer").append($result);
        });
      }
    });
  });

  //Delete a user
  $("#delUserBtn").on("click", function() {
    var userId = $("delUserIdInput").val();

    $.ajax({
      url: "http://localhost:3000//users/" + userId,
      type: "DELETE",
      success: function(status) {
        var $result = $("<p>");
        $result.text("User has been deleted");
        $("#deletedUser").html($result);
      }
    });
  });

  //Delete all reminders from a user
  $("#delAllReminderBtn").on("click", function() {
    var userId = $("#delAllReminUserIdInput").val();

    $.ajax({
      url: "http://localhost:3000//users/" + userId + "/reminders",
      type: "DELETE",
      success: function(res, status) {
        var $result = $("<p>");
        $result.text("All reminders have been deleted.");
        $("#deleteAll").html($result);
      }
    });
  });

  //Delete a reminder from a user
  $("#delReminderBtn").on("click", function() {
    var userId = $("#delReminUserIdInput").val();
    var reminnderId = $("#delReminIdInput").val();

    $.ajax({
      url: "http://localhost:3000//users/" + userId + "/reminders/" + reminderId,
      type: "DELETE",
      success: function(res, status) {
        var $result = $("<p>");
        $result.text("Reminder has been deleted");
        $("#delRemOutput").html($result);
      }
    });
  });
});
