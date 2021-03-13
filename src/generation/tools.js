const {
  getAlphabet,
  getWordLength,
  getFirstLetterIndex,
  getRandomInt
} = require('./helper');
const {
  generateMatriceSimple3D_v2: generateMatriceSimple3D,
  // generateMatriceSimple3D
} = require ('./brain');

const getAvailableCharacters = (matriceSimple3d, first, second, originality, isEnd) => {
  // tab qui contient les index des 0,1,2,3,4 correspondant à l'originalité #
  const tabOriginality = [];
  const row = matriceSimple3d[first][second];

  if (row) {
    // Do not consider END as a probability, let put 0
    if (!isEnd) row[row.length - 1] = 0;
    // Fill tab
    row.forEach((item, index) => {
      if (item === originality) {
        tabOriginality.push(index);
      }
    });

    // TODO à revoir (rare case)
    if (!tabOriginality.length) {
      // console.log("if [1,0,0,4,0,4,0,null,4] and originality = 3")
      row.forEach((item, index) => {
        if (item) {
          tabOriginality.push(index);
        }
      });
    }

    // TODO à revoir (rare case)
    if (!tabOriginality.length) {
      // console.log("if [0,0,null,0,0,null] and originality = 3")
      row.forEach((item, index) => {
        if (item !== null) {
          tabOriginality.push(index);
        }
      });
    }
  }
  // console.log("tabOriginality", tabOriginality)

  return tabOriginality;
};
const getEndingAvailableCharacters = (tabOriginality, matriceSimple3d, second, alphabet) => {
  const tabOriginalityEnding = [];

  // reduce tabOriginality with third items that can end a word [second, third, end]
  tabOriginality.forEach((item, index) => {
    if (matriceSimple3d[second][item] && matriceSimple3d[second][item][alphabet.length] !== 0) { // 26 au undefined
      tabOriginalityEnding[tabOriginalityEnding.length] = item;
    }
  });

  return tabOriginalityEnding;
};
const generateWord = (matriceSimple3d, originality) => {
  // 'first' is initialized to START (index = 26) and 'second' is the actual first letter
  let newWord = [];
  const alphabet = getAlphabet();
  let first = alphabet.length;
  let second = getFirstLetterIndex(alphabet);

  // First letter
  newWord[0] = alphabet[second];

  // Intermediate letters
  const wordLength = getWordLength(10);
  for (let z = 1; z < wordLength - 1; z++) {
    const tabOriginality = getAvailableCharacters(matriceSimple3d, first, second, originality);

    if (tabOriginality.length < 1) {
      // console.warn('warning : no available character', newWord); //todo (check if could happen)
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
  const tabOriginality = getAvailableCharacters(matriceSimple3d, first, second, originality);
  const tabEnding = getEndingAvailableCharacters(tabOriginality, matriceSimple3d, second, alphabet);

  if (tabEnding.length < 1) {
    // console.warn('warning : no ending !', newWord); //not an issue, just shorter
  } else {
    const x = getRandomInt(0, tabEnding.length - 1, newWord);
    const third = tabOriginality[x];
    newWord[wordLength - 1] = alphabet[third];
  }

  if (newWord.length < 2) {
    console.warn('warning : not a word !', newWord); //todo (be carefull about looping? but it should be super rare...)
    return generateWord(matriceSimple3d, originality);
  }

  const word = newWord.join('');
  return word;
};

module.exports.generateWord = generateWord;
