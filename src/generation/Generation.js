const indexOf = require('lodash/indexOf');
const max = require('lodash/max');
const find = require('lodash/find');

const filePath = 'mot.txt';
const { connect } = require('react-redux');
// var generator = require('./generator.js');


const wordGeneration = function (parameters, dico_fr) {
  this.dico_fr = dico_fr;
  this.sonorite = parameters.sonorite;
  this.longueur = parameters.longueur;
  this.originalite = parameters.originalite;
  this.langue = parameters.langue;
  this.word = null;
  this.readFile();
  console.log('---wordGeneration---', this.dico_fr[3]);
};
wordGeneration.prototype.getRandomInt = function (min, max) {
  if (min > max) {
    console.warn('you entered getRandomInt() where min > max...');
    return Math.floor(Math.random() * Math.floor(max));
  }
  let randomInt;
  let limitWhile = 10;
  do {
    randomInt = Math.floor(Math.random() * Math.floor(max));
    limitWhile--;
  }
  while (randomInt < min && limitWhile);
  return randomInt;
};
wordGeneration.prototype.readFile = function () {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      this.words = this.responseText;
      // console.warn(words);
      // console.log(this.words.length)

      this.words = this.words.split('\n');
      // console.log(this.words[0]);
      // console.log(this.words[1]);

      // console.log("test commit", this.words.length)

      // console.log(this.words[100]);
      // console.log(this.words[200]);
      // console.log(this.words[44]);
    }
  };
  xhttp.open('GET', 'http://localhost:3000/fr.txt', true);
  xhttp.send();
};
// wordGeneration.prototype.readFile = function() {
// var str = "";
// var txtFile = new File(filePath);
// txtFile.open("r");
// while (!txtFile.eof) {
// read each line of text
// str += txtFile.readln() + "\n";
// }
// return str;
// };
wordGeneration.prototype.generate = function () {
  console.warn('---GENERATE---');
  // this.readFile();
	  // this part of the code will be replaced by algorithm
  const alph = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
  const wordLength = this.getRandomInt(0, 10);
  let newWord = '';
  for (let i = 0; i < wordLength; i++) {
    newWord += alph[this.getRandomInt(0, alph.length - 1)];
  }
  // console.log("parameters", this.sonorite, this.longueur, this.originalite, this.langue);
  // console.log("newWord", newWord);

  // console.log("OK", this.words.length > 100 ? this.words[100] : "nonnnnn");
  // console.log("this.words", this.words.length);

  this.essai_A();

  // console.log("getAlphabet", generator.getAlphabet());

  console.log();

  return newWord;
};

wordGeneration.prototype.essai_A = function () {
  let mots = [];
  mots[0] = 'abricot';
  mots[1] = 'cacaouette';
  mots[2] = 'pellicule';
  mots[3] = 'rododindron';
  mots[4] = 'membrane';
  mots[5] = 'crevette';
  mots[6] = 'alambic';
  mots[7] = 'croisiere';
  mots[8] = 'zoologie';
  mots[9] = 'hibou';

  mots = 'battement de coeur mitrailleur urgence chanson colonne vertébrale';
  mots += 'foulard hirsute percutant intemporel occidental suave';
  mots += 'absorbable prédateur en colère importe qui morne collider';
  mots += 'primate marque cas sexe direction tete de marteau';
  mots += 'pression phase charnel câlin privilégié balistique';
  mots += 'goldbricker mépris blizzard intelligent fidèle poison';
  mots += 'adoption dôme éther cuivre tromperie programme';
  mots += 'projet bulle prophétiser évoquer redoutable kidnappeur';
  mots += 'babiller mains manger collines composé bleu';
  mots += 'chaine détenu application dome goofball génétique';


  mots = mots.replace('é', 'e');
  mots = mots.replace('é', 'e');
  mots = mots.replace("l'", '');
  mots = mots.replace("d'", '');
  mots = mots.replace('(', '');
  mots = mots.replace(')', '');
  mots = mots.replace(',', '');

  mots = mots.split(' ');

  const matrice = [];

  // from A to Z, length = 26, from [0, 25], the end of the word "/n" is not inside alphabet
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  for (let x = 0; x <= alphabet.length; x++) {
    matrice[x] = [];
    for (let y = 0; y <= alphabet.length; y++) {
      matrice[x][y] = 0;
    }
  }

  console.log('matrice', matrice);


  for (var i = 0; i < mots.length; i++) {
    const mot = mots[i];
    const long = mot.length;

    for (let m = 0; m < long; m++) {
      const firstLetterIndex = indexOf(alphabet, mot[m]);

      if (firstLetterIndex != -1) {
        const secondLetterIndex = m + 1 === long ? alphabet.length : indexOf(alphabet, mot[m + 1]);

        if (secondLetterIndex != -1) {
          // console.log("----", mot, mot[m], firstLetterIndex, secondLetterIndex)
          matrice[firstLetterIndex][secondLetterIndex]++;
        }
      }
    }
  }

  console.log('matrice', matrice);


  const randomLong = this.getRandomInt(3, 10);
  let randomLetterIndex = this.getRandomInt(0, alphabet.length - 1);
  const randomFirstLetter = alphabet[randomLetterIndex];

  console.log('randomLong', randomLong);
  console.log('randomLetterIndex', randomLetterIndex);
  console.log('randomFirstLetter', randomFirstLetter);

  const newWord = [];
  newWord[0] = randomFirstLetter;

  console.log('first letter : ', newWord);

  for (let z = 1; z < randomLong; z++) {
    const row = matrice[randomLetterIndex];
    // écrire une fonction qui prend un chiffre moyen en fonction de originalité
    const maxOccurenceNextLetter = max(matrice[randomLetterIndex]);
    let indexNextLetter = indexOf(matrice[randomLetterIndex], maxOccurenceNextLetter);
    // si max est le 26eme donc "fin", prendre l'avant dernier max
    if (indexNextLetter == 26 && z != randomLong) {
      // prendre pour le moment une autre valeur random

      // maxOccurenceNextLetter = find(matrice[randomLetterIndex], function(item) {
      //   return item < maxOccurenceNextLetter && item != 0;
      // });
      var i = 0;
      let newMaxOccurence = maxOccurenceNextLetter;
      console.warn('maxOccurenceNextLetter', maxOccurenceNextLetter);
      do {
        i += 1;
        const random = this.getRandomInt(1, 25);
        newMaxOccurence = find(matrice[randomLetterIndex], (item) => item == maxOccurenceNextLetter - random);
      } while (i < 26 && !newMaxOccurence);

      console.warn('newMaxOccurence', newMaxOccurence);


      if (!newMaxOccurence) {
        z = randomLong;
      }

      // la nouvelle occurence : newMaxOccurence
      // est elle un index ??? checker ça !!

      // Laaaaaaaa


      indexNextLetter = indexOf(matrice[randomLetterIndex], newMaxOccurence);
      console.log('random...', indexNextLetter, alphabet[indexNextLetter]);
    } else {
      console.log('index et lettre', indexNextLetter, alphabet[indexNextLetter]);
    }

    newWord[z] = alphabet[indexNextLetter];

    randomLetterIndex = indexNextLetter;
  }

  console.log('newWord', newWord);
};

module.exports = wordGeneration;
