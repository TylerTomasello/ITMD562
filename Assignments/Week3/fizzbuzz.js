/* fizzBuzz function to display Fizz if divisible by 3, Buzz if divisible by 5,
* or FizzBuzz if divisible by 3 and 5. This runs through a loop from 1 to 100,
* but can do any range of numbers.
*/
function fizzBuzz(1, 100){
  // for loop runs through the numbers 1 to 100
  for (var i = 1; i <= 100; i++) {
    // if statement checks if divisible by 3 and 5, and displays FizzBuzz if so
    if (i % 3 == 0 && i % 5 == 0) {
      console.log('FizzBuzz');
    }
    // else if checks if divisible by 3, and displays Fizz if so
    else if (i % 3 == 0) {
      console.log('Fizz');
    }
    // else if checks if divisible by 5, and displays Buzz if so
    else if (i % 5 == 0) {
      console.log('Buzz');
    }
    // else displays the number i if none of the above statements are true
    else {
      console.log(i);
    }
  }
}
