const indexOf = require('lodash/indexOf');
const max = require('lodash/max');
const find = require('lodash/find');

const filePath = 'mot.txt';
const { connect } = require('react-redux');
const generator = require('./generator.js');


const wordGeneration = function (props) {
  console.log(props);
  this.sonorite = props.sonorite;
  this.longueur = props.longueur;
  this.originalite = props.originalite;


  this.language = props.language;
  this.word = null;

  this.current_dictionary = props.current_dictionary;
  this.generator = new generator();

  console.log(' ');
  console.log(' ');
  console.log('---wordGeneration---');
  console.log(props);
  console.log(' ');
};

wordGeneration.prototype.generate = function () {
  // PARAMETERS

  // TODO cabler pour pouvoir tester plus facilement
  // TODO cabler les index et non les noms (partout et pour tous les params)
  let originality = 3;
  // originality = this.generator.getRandomInt(1,4);
  originality = 1;
  console.log('--ORIGINALITY--', originality);

  // DICO (TODO)

  // let dico = this.dictionary_french;
  // switch (this.language) {
  //   case "Francais" : dico = this.dictionary_french; break;
  //   case "Anglais" : dico = this.dictionary_english; break;
  //   case "Allemand" : dico = this.dictionary_german; break;
  //   case "Espagnol" : dico = this.dictionary_spanish; break;
  //   case "Italien" : dico = this.dictionary_italian; break;
  // }

  const alphabet = this.generator.getAlphabet();
  // MATRICE DES PROBABILITES
  const matrice = this.generator.generateMatrice3D(this.current_dictionary, alphabet); // this.afficherMatrice(matrice);
  // TABLE SIMPLE GENERATION
  const matriceSimple = this.generator.generateMatriceSimple3D(matrice, alphabet, originality);

  // GENERATE
  // for (var i=1; i<=40; i++) {
  const wordLength = this.generator.getWordLength();
  const newWordArray = this.generator.generation(wordLength, matriceSimple, alphabet, originality);

  // DISPLAY
  let newWord = '';
  newWordArray.forEach((element) => { newWord += element; });
  // console.log("mot", i, newWord);
  // console.log(wordLength, "mot", i, word);
  // }

  return newWord;
};

module.exports = wordGeneration;
