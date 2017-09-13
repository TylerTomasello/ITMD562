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

var requestURL="http://api.flickr.com/services/feeds/photos_public.gne?tags=dogs&format=json&jsoncallback=?";
$.getJSON(requestURL, function (flickrResponse) {
  //Iterate over items
  flickrResponse.items.forEach(function (item){
    //Build an img tag using item.media.m
    var $img = $("<img>").hide();
    $img.attr("src", item.media.m);
    //Add to the DOM
    $("main .photos").append($img);
    $img.fadeIn();
  });
});
