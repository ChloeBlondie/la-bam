const { max } = require('lodash');
const indexOf = require('lodash/indexOf');

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
const getAlphabet = () => {
    const alphaLength = 26;
    const alphabet = [];
    for (let i = 0; i < alphaLength; i++) {
    alphabet[i] = String.fromCharCode(97 + i);
    }
    // console.log("ALPHABET", alphabet) 
    // Array[26] = [a, b, ..., z]
    return alphabet;
};
const generateEmptyMatrice3D = () => {
    const alphabet = getAlphabet();
    const matrice = [];
    for (let x = 0; x <= alphabet.length; x++) {
        matrice[x] = [];
        for (let y = 0; y < alphabet.length; y++) {
        matrice[x][y] = [];
        for (let z = 0; z <= alphabet.length; z++) {
            matrice[x][y][z] = 0;
        }
        }
    }
    // Array[27][26][27] = [a, b, ..., z, start][a, b, ..., z][a, b, ..., z, end]
    return matrice; 
};
const debug = (mot, un, deux, trois) => {
    // if (mot == "adjoindra") {
    //   console.log("---> mot", mot)
    //   console.log(f, s, t)
    // }
    if (un === 26 && deux === 20 && trois === 0) {
        console.log(' _UA ', mot);
    }
};
const getWordLength = (length) => {
    // add length as a parameter
    const wordLength = getRandomInt(3, length >= 3 ? length : 3);
    // console.log("wordLength", wordLength);

    return wordLength;
};
const getFirstLetterIndex = (alphabet, originality) => {
    // add originality as a parameter
    const randomLetterIndex = getRandomInt(0, alphabet.length - 1);
    // const randomFirstLetter = alphabet[randomLetterIndex];
    // console.log("randomLetterIndex", randomLetterIndex)
    // console.log("randomFirstLetter", randomFirstLetter)

    return randomLetterIndex;
};
const generateMatrice3D = (dictionary) => {
    const matrice = generateEmptyMatrice3D();
    const alphabet = getAlphabet();
    const dicLength = dictionary.length;
    let total = 0;
    let max = 0;

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
                            total++;
                            const currentTotal = matrice[firstLetterIndex][secondLetterIndex][thirdLetterIndex];
                            max = currentTotal > max ? currentTotal : max; 
                        }
                    }
                }
            }
        }
    }
    // console.log("matrice de word _ND", matrice[26][13]);
    // afficherMatrice(matrice);
    return {
        matrice,
        total,
        max
    };
};
const isExistingWord = (dictionary, word) => {
    const dicLength = dictionary.length;
    let i = 0;
    let isExisting = false;
    while (i < dicLength && isExisting === false) {
        const dicWord = dictionary[i].toLowerCase();
        if (dicWord.length === word.length) {
            isExisting = (word === dicWord);
        }
        i++;
    }
    return isExisting;
};

// export {
//     getAlphabet,
//     generateEmptyMatrice3D,
//     generateMatrice3D,
//     debug,
//     getWordLength,
//     getFirstLetterIndex,
// }
module.exports.getAlphabet = getAlphabet;
module.exports.generateEmptyMatrice3D = generateEmptyMatrice3D;
module.exports.generateMatrice3D = generateMatrice3D;
module.exports.debug = debug;
module.exports.getWordLength = getWordLength;
module.exports.getFirstLetterIndex = getFirstLetterIndex;
module.exports.getRandomInt = getRandomInt;
module.exports.isExistingWord = isExistingWord;