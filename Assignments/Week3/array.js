/* Function max that sorts the array in desending order so it goes from largest
* to smallest. It then uses a for loop to return the three largest numbers in
* the array.
*/
function max(array[]){
  // sort function to make it desending
  array.sort(function(a, b){return b - a});
  // for loop runs 3 times returning the three largest numbers.
  for(i=0; i<2; i++){
    return array[i];
  }
}

// sample test
max([1,2,3,4]);
//=> 4 3 2
