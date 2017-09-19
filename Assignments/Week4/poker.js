// Tyler Tomasello
// 9/19/17
// Week4 Assignment
// This program determines the type of hand for a poker game.
var handAssessor = function (Card){
  var ranks = ["two", "three", "four", "five", "six", "seven", "eight",
               "nine", "ten", "jack", "queen", "king", "ace"];
  var suits = ["spades", "hearts", "clubs", "diamons"];

  var handRanks = hand.map(function (card) {
    return card.rank;
  });

  var handSuits = hand.map(function (card) {
    return card.suit;
  });

  //displaythe ranks and suits of the cards
  console.log(rank);
  console.log(suit)

  //call each function to determine what they have
  containsOfAKind(handRanks);
  containsFlush(handSuits);
  containsStraight(handRanks);
  containsSpecialFlush(handRanks, handSuits);
}

//this finds if there is a two pair, three of a kind, four of a kind, or full
//house.
var containsOfAKind = function (handRanks) {
  //variables to be used for determing what kind of pair or full house
  var twoPairCount = 0;
  var threePairCount = 0;
  var fourPairCount = 0;

  //goes through each rank
  ranks.forEach(function (rank) {
    //if there is a two pair
    if (containsNTimes(handRanks, rank, 2)){
      twoPairCount++;
    }
    //if there is a three of a kind
    if (containsNTimes(handRanks, rank, 3)){
      threePairCount++;
    }
    //if there is a four of a kind
    if (containsNTimes(handRanks, rank, 4)){
      fourPairCount++;
    }
  });

  //these use the counters to display what kind it is
  if (twoPairCount === 1 && threePairCount === 1){
    console.log("Full house");
  }
  else if (twoPairCount === 1){
    console.log("Two pair");
  }
  else if (threePairCount === 1){
    console.log("Three of a kind");
  }
  else if (fourPairCount === 1){
    console.log("Four of a kind");
  }
  else {
    console.log("Bust");
  }
};

//this finds if there is a flush
var containsFlush = function (handSuits) {
  suits.forEach(function (suit) {
    //checks to see if all the suits are the same
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
  //sorts the ranks to make easier to determine straight
  handRanks.sort(function (a, b) {return a - b});

  ranks.forEach(function (rank) {
    //if the ranks are in order
    if (handRanks === [rank[i], rank[i+1], rank[i+2], rank[i+3], rank[i+4]]){
      console.log("Straight");
    }
    else{
      console.log("Bust");
    }
  });
};

//this finds if there is a straight or royal flush
var containsSpecialFlush = function (handRanks, handSuits) {
  //sorts the ranks to make easier to determine
  handRanks.sort(function (a, b) {return a - b});

  suits.forEach(function (suit) {
    //chesks if all suits are the same
    if (containsNTimes(handSuits, suit, 5)){
      ranks.forEach(function (rank) {
        //if there are a ten through ace in order then royal flush
        if (handRanks === ["ten", "jack", "queen", "king", "ace"]){
          console.log("Royal Flush");
        }
        //if in order of ranks and same suits then straight flush
        if (handRanks === [rank[i], rank[i+1], rank[i+2], rank[i+3], rank[i+4]]){
          console.log("Straight Flush");
        }
      });
    }
    else{
      console.log("Bust");
    }
  });
};
