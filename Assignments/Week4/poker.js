handAssessor(array){
  var ranks = ["two", "three", "four", "five", "six", "seven", "eight",
               "nine", "ten", "jack", "queen", "king", "ace"];

  var containsPair = function (hand) {
    var result = false,
    handRanks;

    handRanks = hand.map(function (card) {
      return card.rank;
    });

    ranks.forEach(function (rank) {
      if (containsNTimes(handRanks, rank, 2)){
        result = true;
      }
    });

    return result;
  };
}
