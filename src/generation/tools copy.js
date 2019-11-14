const indexOf = require('lodash/indexOf');
const max = require('lodash/max');
const find = require('lodash/find');
// var mots = require('./dictionaries/fr.js');

const generator = function () {};

generator.prototype.L = {
  A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8, J: 9, K: 10, L: 11, M: 12, N: 13, O: 14, P: 15, Q: 16, R: 17, S: 18, T: 19, U: 20, V: 21, W: 22, X: 23, Y: 24, Z: 25,
};

generator.prototype.afficherMatrice = function (matrice) {
  let string = '';
  const alpha = this.getAlphabet();
  alpha.forEach((l) => { string += l; });
  // console.log(string)
};

generator.prototype.debug = function (mot, un, deux, trois) {
  // if (mot == "adjoindra") {
  //   console.log("---> mot", mot)
  //   console.log(f, s, t)
  // }
  if (un == 26 && deux == 20 && trois == 0) {
    console.log(' _UA ', mot);
  }
};

generator.prototype.generateEmptyMatrice3D = function (length) {
  const matrice = [];
  // we add a FIRST character. ex: au = [start, A, U, end]
  for (let x = 0; x <= length; x++) {
    matrice[x] = [];
    for (let y = 0; y < length; y++) {
      matrice[x][y] = [];
      // we add a END character. ex: au = [start, A, U, end]
      for (let z = 0; z <= length; z++) {
        matrice[x][y][z] = 0;
      }
    }
  }
  return matrice;
};

generator.prototype.generateMatrice3D = function (mots, alphabet) {
  const matrice = this.generateEmptyMatrice3D(alphabet.length);

  for (let i = 0; i < mots.length; i++) {
    const mot = mots[i];
    const long = mot.length;
    // word like "a" are not considered
    if (mot.length > 1) {
      for (let z = 0; z < long; z++) {
        const firstLetterIndex = z === 0 ? alphabet.length : indexOf(alphabet, mot[z - 1]);

        if (firstLetterIndex != -1) {
          const secondLetterIndex = indexOf(alphabet, mot[z]);

          if (secondLetterIndex != -1) {
            const thirdLetterIndex = z + 1 === long ? alphabet.length : indexOf(alphabet, mot[z + 1]);

            if (thirdLetterIndex != -1) {
              // console.log("----", mot, mot[z], firstLetterIndex, secondLetterIndex, thirdLetterIndex)
              this.debug(mot, firstLetterIndex, secondLetterIndex, thirdLetterIndex);
              matrice[firstLetterIndex][secondLetterIndex][thirdLetterIndex]++;
            }
          }
        }
      }
    }
  }
  // console.log("matrice de mot _ND", matrice[26][13]);
  return matrice;
};

generator.prototype.getWordLength = function (length) {
  // add length as a parameter
  const wordLength = this.getRandomInt(4, 14);
  // console.log("wordLength", wordLength);

  return wordLength;
};

generator.prototype.getFirstLetterIndex = function (alphabet, originality) {
  // add originality as a parameter
  const randomLetterIndex = this.getRandomInt(0, alphabet.length - 1);
  const randomFirstLetter = alphabet[randomLetterIndex];
  // console.log("randomLetterIndex", randomLetterIndex)
  // console.log("randomFirstLetter", randomFirstLetter)

  return randomLetterIndex;
};

// TODO
// Matrice contient 0, 1, 2, 3, ou 4
generator.prototype.generateMatriceSimple3D = function (matrice, alphabet, originality) {
  const matriceSimple3d = [];

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

generator.prototype.getAvailableLetters = function (matriceSimple3d, first, second, end, originality) {
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

generator.prototype.getEndingAvailableLetters = function (tabOriginality, matriceSimple3d, second, alphabet) {
  const tabOriginalityEnding = [];

  // reduce tabOriginality with third items that can end a word [second, third, end]
  tabOriginality.forEach((item, index) => {
    if (matriceSimple3d[second][item] && matriceSimple3d[second][item][alphabet.length] !== 0) { // 26 au undefined
      tabOriginalityEnding[tabOriginalityEnding.length] = item;
    }
  });

  return tabOriginalityEnding;
};

generator.prototype.generationOld = function (wordLength, matriceSimple3d, alphabet, originality) {
  // first letter is START (index = 26)
  const newWord = [];
  let first = alphabet.length;
  let second = this.getFirstLetterIndex(alphabet);
  newWord[0] = alphabet[second];

  for (let z = 1; z < wordLength; z++) {
    const tabOriginality = this.getAvailableLetters(matriceSimple3d, first, second);

    if (tabOriginality.length) {
      const x = this.getRandomInt(0, tabOriginality.length - 1);
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
          third = tabOriginality[this.getRandomInt(0, tabOriginality.length - 1)];
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
          second = this.getFirstLetterIndex(alphabet);
        }
      }
    }
  }

  return newWord;
};

generator.prototype.generation = function (wordLength, matriceSimple3d, alphabet, originality) {
  // 'first' is initialized to START (index = 26) and 'second' is the actual first letter
  const newWord = [];
  let first = alphabet.length;
  let second = this.getFirstLetterIndex(alphabet);

  // First letter
  newWord[0] = alphabet[second];

  // Intermediate letters
  for (let z = 1; z < wordLength - 1; z++) {
    const tabOriginality = this.getAvailableLetters(matriceSimple3d, first, second, originality);

    if (tabOriginality.length < 1) {
      console.warn('...', first, second); // 1 25  // 1 26
      // newWord = this.generation(wordLength, matriceSimple3d, alphabet, originality);
    } else {
      const x = this.getRandomInt(0, tabOriginality.length - 1, newWord);
      const third = tabOriginality[x];
      newWord[z] = alphabet[third];

      // roulement des index i, j
      first = second;
      second = third;
    }
  }

  // Last letter
  const tabOriginality = this.getAvailableLetters(matriceSimple3d, first, second, originality);
  const tabEnding = this.getEndingAvailableLetters(tabOriginality, matriceSimple3d, second, alphabet);

  if (tabEnding.length < 1) {
    console.warn('........', first, second);
    // newWord = this.generation(wordLength, matriceSimple3d, alphabet, originality);
  } else {
    const x = this.getRandomInt(0, tabEnding.length - 1, newWord);
    const third = tabOriginality[x];
    newWord[wordLength - 1] = alphabet[third];
  }

  return newWord;
};

generator.prototype.getRandomInt = function (min, max, word) {
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

generator.prototype.getAlphabet = function () {
  // from 'a' to 'z', length = 26, from [0, 25], the end of the word "/n" is not inside alphabet
  const alphabet = [];
  for (let i = 0; i < 26; i++) {
    alphabet[i] = String.fromCharCode(97 + i);
  }
  // console.log("ALPHABET", alphabet)
  return alphabet;
};
/*

//--------- EXECUTION node.js --------- //

// PARAMETERS
let originality = 3; // TODO
originality = generator.prototype.getRandomInt(1,4);
originality = 4;

console.log("--ORIGINALITY--", originality)

const alphabet = generator.prototype.getAlphabet();
// MATRICE DES PROBABILITES
const matrice = generator.prototype.generateMatrice3D(mots, alphabet); // this.afficherMatrice(matrice);
// TABLE SIMPLE GENERATION
const matriceSimple = generator.prototype.generateMatriceSimple3D(matrice, alphabet, originality);

for (var i=1; i<=40; i++) {

  const wordLength = generator.prototype.getWordLength();
	var newWordArray = generator.prototype.generation(wordLength, matriceSimple, alphabet, originality);

  // DISPLAY
  let word = '';
	newWordArray.forEach( function(element) {word += element} );
  console.log("mot", i, word);
	// console.log(wordLength, "mot", i, word);
}
*/

module.exports = generator;
