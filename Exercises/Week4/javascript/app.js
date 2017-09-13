$.getJSON("cards/aceOfSpades.json", function (card) {
  var $cardParagraph = $("<p>");
  $cardParagraph.text(card.rank + " of " + card.suit);
  $("main").append($cardParagraph);
});

$.getJSON("cards/hand.json", function (hand) {
  var $handUl = $("<ul>");

  hand.forEach(function (card) {
    var $cardLi = $("<li>");
    $cardLi.text(card.rank + " of " + card.suit);
    $handUl.append($cardLi);
  });
  $("main").append($handUl);
});
