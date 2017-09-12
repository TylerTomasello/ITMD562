/*selectors.js file to change the color of the child fields of relevant
*/
var main = function () {
  "use strict;"
  //change the color for the first child to red and fadeIn
  $("p:nth-child(1)").css("color", "red");
  $("p:nth-child(1)").fadeIn();
  //change the color for the first child to blue and fadeIn
  $("p:nth-child(2)").css("color", "blue");
  $("p:nth-child(2)").fadeIn();
  //change the color for the first child to green and fadeIn
  $("p:nth-child(3)").css("color", "green");
  $("p:nth-child(3)").fadeIn();
  //change the color for the first child to yellow and fadeIn
  $("p:nth-child(4)").css("color", "yellow");
  $("p:nth-child(4)").fadeIn();
  //change the color for the first child to orange and fadeIn
  $("p:nth-child(5)").css("color", "orange");
  $("p:nth-child(5)").fadeIn();
  //change the color for the first child to purple and fadeIn
  $("p:nth-child(6)").css("color", "purple");
  $("p:nth-child(6)").fadeIn();
  //change the color for the first child to pink and fadeIn
  $("p:nth-child(7)").css("color", "pink");
  $("p:nth-child(7)").fadeIn();
};
$(document).ready(main);
