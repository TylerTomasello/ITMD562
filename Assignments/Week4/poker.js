handAssessor(array){
  var ranks = ["two", "three", "four", "five", "six", "seven", "eight",
               "nine", "ten", "jack", "queen", "king", "ace"];

  //this finds if there is a two pair
  var containsPair = function (hand) {
    var result = false,
    handRanks;

    handRanks = hand.map(function (card) {
      return card.rank;
    });

    ranks.forEach(function (rank) {
      //if there is a two pair
      if (containsNTimes(handRanks, rank, 2)){
        result = true;
      }
    });

    return result;
  };

  //this finds if there is a three of a kind
  var containsThreeOfAKind = function (hand) {
    var result = false,
    handRanks;

    handRanks = hand.map(function (card) {
      return card.rank;
    });

    ranks.forEach(function (rank) {
      if (containsNTimes(handRanks, rank, 3)){
        result = true;
      }
    });

    return result;
  };

  //this finds if there is a three of a kind
  var containsFourOfAKind = function (hand) {
    var result = false,
    handRanks;

    handRanks = hand.map(function (card) {
      return card.rank;
    });

    ranks.forEach(function (rank) {
      if (containsNTimes(handRanks, rank, 4)){
        result = true;
      }
    });

    return result;
  };
}
