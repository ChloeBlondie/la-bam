const indexOf = require('lodash/indexOf');
const max = require('lodash/max');

const getAlphabet = () => {
  // from 'a' to 'z', length = 26, from [0, 25], the end of the word "/n" is not inside alphabet
  const alphaLength = 26;
  const alphabet = [];
  for (let i = 0; i < alphaLength; i++) {
    alphabet[i] = String.fromCharCode(97 + i);
  }
  // console.log("ALPHABET", alphabet)
  return alphabet;
};
const generateEmptyMatrice3D = () => {
  const alphabet = getAlphabet();
  const matrice = [];
  // we add a FIRST character. ex: mot "au" = [start, A, U, end]
  for (let x = 0; x <= alphabet.length; x++) {
    matrice[x] = [];
    for (let y = 0; y < alphabet.length; y++) {
      matrice[x][y] = [];
      // we add a END character. ex: au = [start, A, U, end]
      for (let z = 0; z <= alphabet.length; z++) {
        matrice[x][y][z] = 0;
      }
    }
  }
  return matrice;
};
const generateMatrice3D = (dictionary) => {
  const matrice = generateEmptyMatrice3D();
  const alphabet = getAlphabet();
  const dicLength = dictionary.length;

  for (let i = 0; i < dicLength; i++) {
    const word = dictionary[i].toLowerCase();
    const long = word.length;

    // The words like "a" are not considered as "word"
    if (word.length > 1) {
      for (let z = 0; z < long; z++) {
        const firstLetterIndex = z === 0 ? alphabet.length : indexOf(alphabet, word[z - 1]);

        if (firstLetterIndex != -1) {
          const secondLetterIndex = indexOf(alphabet, word[z]);

          if (secondLetterIndex != -1) {
            const thirdLetterIndex = z + 1 === long ? alphabet.length : indexOf(alphabet, word[z + 1]);

            if (thirdLetterIndex != -1) {
              // console.log("----", word, word[z], firstLetterIndex, secondLetterIndex, thirdLetterIndex)
              debug(word, firstLetterIndex, secondLetterIndex, thirdLetterIndex);
              matrice[firstLetterIndex][secondLetterIndex][thirdLetterIndex]++;
            }
          }
        }
      }
    }
  }
  // console.log("matrice de word _ND", matrice[26][13]);
  // afficherMatrice(matrice);
  return matrice;
};
const debug = (mot, un, deux, trois) => {
  // if (mot == "adjoindra") {
  //   console.log("---> mot", mot)
  //   console.log(f, s, t)
  // }
  if (un == 26 && deux == 20 && trois == 0) {
    console.log(' _UA ', mot);
  }
};
const getWordLength = (length) => {
  // add length as a parameter
  const wordLength = getRandomInt(4, 14);
  // console.log("wordLength", wordLength);

  return wordLength;
};
const getFirstLetterIndex = (alphabet, originality) => {
  // add originality as a parameter
  const randomLetterIndex = getRandomInt(0, alphabet.length - 1);
  const randomFirstLetter = alphabet[randomLetterIndex];
  // console.log("randomLetterIndex", randomLetterIndex)
  // console.log("randomFirstLetter", randomFirstLetter)

  return randomLetterIndex;
};
const getAvailableLetters = (matriceSimple3d, first, second, end, originality) => {
  // tab qui contient les index des 0,1,2,3,4 correspondant à l'originalité #
  const tabOriginality = [];

  const row = matriceSimple3d[first][second];

  if (row) {
    // Do not consider END as a probability, let put 0
    if (!end) row[row.length - 1] = 0;
    // Fill tab
    row.forEach((item, index) => {
      if (item === originality) {
        tabOriginality[tabOriginality.length] = index;
      }
    });

    // TODO
    // if [0,0,0,4,0,4,0,0,4] and originality = 3
    if (!tabOriginality.length) {
      row.forEach((item, index) => {
        if (item !== 0) {
          tabOriginality[tabOriginality.length] = index;
        }
      });
    }
  }

  return tabOriginality;
};
const getEndingAvailableLetters = (tabOriginality, matriceSimple3d, second, alphabet) => {
  const tabOriginalityEnding = [];

  // reduce tabOriginality with third items that can end a word [second, third, end]
  tabOriginality.forEach((item, index) => {
    if (matriceSimple3d[second][item] && matriceSimple3d[second][item][alphabet.length] !== 0) { // 26 au undefined
      tabOriginalityEnding[tabOriginalityEnding.length] = item;
    }
  });

  return tabOriginalityEnding;
};
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
const getRandomInt = (min, max, word) => {
  if (min > max) {
    console.warn('you entered getRandomInt() where min > max...', word);
    return Math.floor(Math.random() * Math.floor(max));
  }
  if (min === max) return min;

  let randomInt;
  let limitWhile = 10;
  do {
    randomInt = Math.floor(Math.random() * Math.floor(max));
    limitWhile--;
  }
  while (randomInt < min && limitWhile);
  return randomInt;
};
// TODO Matrice contient 0, 1, 2, 3, ou 4
const generateMatriceSimple3D = (dictionary, originality) => {
  const matriceSimple3d = [];
  const alphabet = getAlphabet();
   // MATRICE DES PROBABILITES
  const matrice = generateMatrice3D(dictionary);
  
  for (let i = 0; i <= alphabet.length; i++) {
    const matriceSimple2d = [];

    for (let ii = 0; ii < alphabet.length; ii++) {
      const row = matrice[i][ii];
      // console.log("ROW pour i", row)

      let total = 0;
      row.forEach((item) => {
        total += item;
      });
      // console.log("TOTAL pour i = ", total)

      const tabEnPourcentage = [];
      row.forEach((item, index) => {
        tabEnPourcentage[index] = Math.round(100 * (item / total) * 100) / 100;
      });
      // console.log("TABLE % pour ", alphabet[i], " = ", tabEnPourcentage);

      // find max M % of letter following index letter
      const tabSimple = [];
      var M = max(tabEnPourcentage);
      // create a table simplifying tabEnPourcentage depending on max M and %
      tabEnPourcentage.forEach((item, index) => {
        if (item <= 1) tabSimple[index] = 0;
        else if (item <= M / 4) tabSimple[index] = 1;
        else if (item <= M / 2) tabSimple[index] = 2;
        else if (item <= M * 3 / 4) tabSimple[index] = 3;
        else if (item <= M) tabSimple[index] = 4;
      });
      // console.log("TABLE 1234 pour ", alphabet[i], " = ", tabSimple);

      matriceSimple2d[ii] = tabSimple;
    }

    matriceSimple3d[i] = matriceSimple2d;
  }

  // console.log(matriceSimple);
  return matriceSimple3d;
};
const generateWord = (matriceSimple3d, originality) => {
  // 'first' is initialized to START (index = 26) and 'second' is the actual first letter
  const newWord = [];
  const alphabet = getAlphabet();
  let first = alphabet.length;
  let second = getFirstLetterIndex(alphabet);

  // First letter
  newWord[0] = alphabet[second];

  // Intermediate letters
  const wordLength = getWordLength();
  for (let z = 1; z < wordLength - 1; z++) {
    const tabOriginality = getAvailableLetters(matriceSimple3d, first, second, originality);

    if (tabOriginality.length < 1) {
      console.warn('...', first, second); // 1 25  // 1 26
      // newWord = generation(wordLength, matriceSimple3d, alphabet, originality);
    } else {
      const x = getRandomInt(0, tabOriginality.length - 1, newWord);
      const third = tabOriginality[x];
      newWord[z] = alphabet[third];

      // roulement des index i, j
      first = second;
      second = third;
    }
  }

  // Last letter
  const tabOriginality = getAvailableLetters(matriceSimple3d, first, second, originality);
  const tabEnding = getEndingAvailableLetters(tabOriginality, matriceSimple3d, second, alphabet);

  if (tabEnding.length < 1) {
    console.warn('........', first, second);
    // newWord = generation(wordLength, matriceSimple3d, alphabet, originality);
  } else {
    const x = getRandomInt(0, tabEnding.length - 1, newWord);
    const third = tabOriginality[x];
    newWord[wordLength - 1] = alphabet[third];
  }

  const word = newWord.join('')
  return word;
};

module.exports.getRandomInt = getRandomInt;
module.exports.generateMatriceSimple3D = generateMatriceSimple3D;
module.exports.generateWord = generateWord;
