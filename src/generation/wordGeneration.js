import React from 'react';
import PropTypes from 'prop-types';
import Generator from './generator.js';
import { Context } from '../config/state.manager';

const wordGeneration = (parameters, dico) => {
  // console.log("--parameters", parameters)
  // console.log("--dico", dico)
  const { sonority, length, originality, language } = parameters;

  // console.log('sonority', sonority);
  // console.log('length', length);
  // console.log('originality', originality);
  // console.log('language', language);

  const generator = new Generator();
  const alphabet = generator.getAlphabet();
  // MATRICE DES PROBABILITES
  const matrice = generator.generateMatrice3D(dico, alphabet); // this.afficherMatrice(matrice);
  // TABLE SIMPLE GENERATION
  const matriceSimple = generator.generateMatriceSimple3D(matrice, alphabet, originality);

  // GENERATE
  // for (var i=1; i<=40; i++) {
  const wordLength = generator.getWordLength();
  const newWordArray = generator.generation(wordLength, matriceSimple, alphabet, originality);

  // DISPLAY
  let newWord = '';
  newWordArray.forEach((element) => { newWord += element; });
  // console.log("mot", i, newWord);
  // console.log(wordLength, "mot", i, word);
  // }

  return newWord;
};

wordGeneration.propTypes = {
  sonority: PropTypes.integer,
  length: PropTypes.integer,
  originality: PropTypes.integer,
  language: PropTypes.integer,
  // current_dictionary: PropTypes.array,
};

export default wordGeneration;
