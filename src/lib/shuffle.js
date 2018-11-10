const hexToBytes = function(hex) {
    return hex.match(/../g).map(function(x) { return parseInt(x,16) });
}

/**
 * Shuffles a small array (less than 256 element) in place, given a shuffler.  The shuffler
 * is a hex base 16 string that contains encoded bytes that indicate how the cards should
 * be shuffled.  Given the same shuffler the results of the array will be the same (deterministic)
 * The shuffler should contain bytes
 */
export default function (array, shuffler) {
  var i = 0
    , j = 0
    , temp = null;

  const b = hexToBytes(shuffler)

  //assert(b.length >= array.length)

  //this is based on the Fisher-Yates Shuffle algorithm with the
  //random numbers being replaced by the shuffler
  for (i = array.length - 1; i > 0; i -= 1) {
    //this is good enough...for now.  with a deck of cards the elements at the
    //beginning of the array are given a higher probability of swapping due to
    //the fact that the (byte % 52) has a higher probablilty of being between 0 to 47 than 48-51
    j = b[i] % array.length
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

// module.exports.shuffle = shuffle;

//example usage
//a = Array.from({length: 52}, (v, k) => k);
//shuffle(a, "D95849AA570A03231B69C65749054A6C8770C7345F8673EC12FA94B302A1ECCC9A90AF79B356FE648479EA59AF6BE7094AD323C3AC4B7373016D6A078625BF43")
//console.log(a)
