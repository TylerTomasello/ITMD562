var handAssessor = function (Card){
  var ranks = ["two", "three", "four", "five", "six", "seven", "eight",
               "nine", "ten", "jack", "queen", "king", "ace"];
  var suits = ["spades", "hearts", "clubs", "diamons"];

  var handRanks = hand.map(function (card) {
    return card.rank;
  });

  containsOfAKind(handRanks);

  var handSuits = hand.map(function (card) {
    return card.suit;
  });

  console.log(rank);
}

//this finds if there is a two pair
var containsOfAKind = function (handRanks) {
  var twoPairCount = 0;
  var threePairCount = 0;
  var fourPairCount = 0;

  ranks.forEach(function (rank) {
    //if there is a two pair
    if (containsNTimes(handRanks, rank, 2)){
      twoPairCount++;
    }
    if (containsNTimes(handRanks, rank, 3)){
      threePairCount++;
    }
    if (containsNTimes(handRanks, rank, 4)){
      fourPairCount++;
    }
  });

  if (twoPairCount === 1 && threePairCount === 1){
    console.log("Full house");
  }
  if (twoPairCount === 1){
    console.log("Two pair");
  }
  if (threePairCount === 1){
    console.log("Three of a kind");
  }
  if (fourPairCount === 1){
    console.log("Four of a kind");
  }
  else {
    console.log("Bust");
  }
};

//this finds if there is a flush
var containsFlush = function (handSuits) {
  suits.forEach(function (suit) {
    if (containsNTimes(handSuits, suit, 5)){
      console.log("Flush");
    }
    else{
      console.log("Bust");
    }
  });
};

//this finds if there is a straight
var containsStraight = function (handRanks) {
  ranks.forEach(function (rank) {
    if (handRanks === [rank, rank+1, rank+2, rank+3, rank+4]){
      console.log("Straight");
    }
    else{
      console.log("Bust");
    }
  });
};

//this finds if there is a straight flush
var containsStraightFlush = function (handRanks, handSuits) {
  suits.forEach(function (suit) {
    if (containsNTimes(handSuits, suit, 5)){
      ranks.forEach(function (rank) {
        if (handRanks === [rank, rank+1, rank+2, rank+3, rank+4]){
          console.log("Straight Flush");
        }
      });
    }
    else{
      console.log("Bust");
    }
  });
};

//this finds if there is a royal flush
var containsRoyalFlush = function (handRanks, handSuits) {
  suits.forEach(function (suit) {
    if (containsNTimes(handSuits, suit, 5)){
      ranks.forEach(function (rank) {
        if (handRanks === ["ten", "jack", "queen", "king", "ace"]){
          result = true;
          console.log("Royal Flush");
        }
      });
    }
    else{
      console.log("Bust");
    }
  });
};
