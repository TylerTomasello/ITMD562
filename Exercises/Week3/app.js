/*
var main = function () {
  "use strict";

  window.alert("hello world!");
};
$(document).ready(main);
*/

var addCommentFromInputBox = function () {
  var $comment_text = $(".comment-input input");
  if($comment_text.val() !== ""){
    var $new_comment = $("<p>");
    $new_comment.text($comment_text.val());
    $(".comments").append($new_comment);
    $new_comment.fadeIn();
    $comment_text.val("");
  }
};

$("comment-input button").on("click", function () {
  addCommentFromInputBox();
});

$(".comment-input button").on("keypress", function (event) {
  if(event.keyCode == 13){
    addCommentFromInputBox();
  }
});
