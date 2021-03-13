/*
const generationOld = (wordLength, matriceSimple3d, alphabet, originality) => {
    // first letter is START (index = 26)
    const newWord = [];
    let first = alphabet.length;
    let second = getFirstLetterIndex(alphabet);
    newWord[0] = alphabet[second];
  
    for (let z = 1; z < wordLength; z++) {
      const tabOriginality = getAvailableLetters(matriceSimple3d, first, second);
  
      if (tabOriginality.length) {
        const x = getRandomInt(0, tabOriginality.length - 1);
        let third = tabOriginality[x];
  
        if (z === wordLength - 1) {
          if (!alphabet[third]) {
            // debug
            console.log('newWord', newWord);
            console.log('third', third);
            console.log('z', z);
            console.log('wordLength', wordLength);
  
            // ICI LAAaaaaaa
            // Il prend la dernièere lettre comme 26 sauf que c'est pas une lettre
            // alors UNDEFINED....
          }
          newWord[z] = alphabet[third];
          // roulement des index i, j
          first = second;
          second = third;
        } else {
          let i = 0;
          do {
            third = tabOriginality[getRandomInt(0, tabOriginality.length - 1)];
            i++;
          }
          while (third === 26 && i < 10);
  
          newWord[z] = alphabet[third];
          // roulement des index i, j
          first = second;
          second = third;
  
          if (third === 26) {
            // console.log(".")
            // console.log("newWord", newWord);
            // console.log("tabOriginality", tabOriginality);
            // console.log("newWord", newWord);
  
            // TODO
            // for the moment, just re-init...
            z = 1;
            first = alphabet.length;
            second = getFirstLetterIndex(alphabet);
          }
        }
      }
    }
  
    return newWord;
  };
  */