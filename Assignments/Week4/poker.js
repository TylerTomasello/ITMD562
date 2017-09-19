handAssessor(Card){
  var ranks = ["two", "three", "four", "five", "six", "seven", "eight",
               "nine", "ten", "jack", "queen", "king", "ace"];
  var suits = ["spades", "hearts", "clubs", "diamons"];

  //this finds if there is a two pair
  var containsPair = function (hand) {
    var result = false,
    handRanks;

    handRanks = hand.map(function (card) {
      return card.rank;
    });

    ranks.forEach(function (rank) {
      //if there is a two pair
      console.log(rank);
      if (containsNTimes(handRanks, rank, 2)){
        result = true;
        console.log("Two pair");
      }
      else{
        console.log("Bust");
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
      console.log(rank);
      if (containsNTimes(handRanks, rank, 3)){
        result = true;
        console.log("Three of a kind");
      }
      else{
        console.log("Bust");
      }
    });

    return result;
  };

  //this finds if there is a four of a kind
  var containsFourOfAKind = function (hand) {
    var result = false,
    handRanks;

    handRanks = hand.map(function (card) {
      return card.rank;
    });

    ranks.forEach(function (rank) {
      console.log(rank);
      if (containsNTimes(handRanks, rank, 4)){
        result = true;
        console.log("Four of a kind");
      }
      else{
        console.log("Bust");
      }
    });

    return result;
  };

  //this finds if there is a flush
  var containsFlush = function (hand) {
    var result = false,
    handSuits;

    handSuits = hand.map(function (card) {
      return card.suit;
    });

    suits.forEach(function (suit) {
      console.log(suit);
      if (containsNTimes(handSuits, suit, 5)){
        result = true;
        console.log("Flush");
      }
      else{
        console.log("Bust");
      }
    });

    return result;
  };

  //this finds if there is a full house
  var containsFullHouse = function (hand) {
    var result = false,
    handRanks;

    handRanks = hand.map(function (card) {
      return card.rank;
    });

    ranks.forEach(function (rank) {
      console.log(rank);
      if (containsNTimes(handRanks, rank, 2)){
        ranks.forEach(function (rank) {
          if (containsNTimes(handRanks, rank, 3)){
            result = true;
            console.log("Full House");
          }
        });
      }
      else{
        console.log("Bust");
      }
    });

    return result;
  };

  //this finds if there is a straight
  var containsStraight = function (hand) {
    var result = false,
    handRanks;

    handRanks = hand.map(function (card) {
      return card.rank;
    });

    ranks.forEach(function (rank) {
      console.log(rank);
      if (handRanks === [rank, rank+1, rank+2, rank+3, rank+4]){
        result = true;
        console.log("Straight");
      }
      else{
        console.log("Bust");
      }
    });

    return result;
  };

  //this finds if there is a straight flush
  var containsStraightFlush = function (hand) {
    var result = false,
    handRanks,
    handSuits;

    handRanks = hand.map(function (card) {
      return card.rank;
    });
    handSuits = hand.map(function (card) {
      return card.suit;
    });

    suits.forEach(function (suit) {
      console.log(suit);
      if (containsNTimes(handSuits, suit, 5)){
        ranks.forEach(function (rank) {
          console.log(rank);
          if (handRanks === [rank, rank+1, rank+2, rank+3, rank+4]){
            result = true;
            console.log("Straight Flush");
          }
        });
      }
      else{
        console.log("Bust");
      }
    });

    return result;
  };

  //this finds if there is a royal flush
  var containsRoyalFlush = function (hand) {
    var result = false,
    handRanks,
    handSuits;

    handRanks = hand.map(function (card) {
      return card.rank;
    });
    handSuits = hand.map(function (card) {
      return card.suit;
    });

    suits.forEach(function (suit) {
      console.log(suit);
      if (containsNTimes(handSuits, suit, 5)){
        ranks.forEach(function (rank) {
          console.log(rank);
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

    return result;
  };
}
