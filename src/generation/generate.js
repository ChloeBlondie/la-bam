import {
  getAlphabet,
  generateMatrice3D,
  generateMatriceSimple3D,
  getWordLength,
  generateWord
} from './tools';

const generate = (parameters, dico) => {
  const { sonority, length, originality } = parameters;
  // const generator = new Generator();
  const alphabet = getAlphabet();

  // MATRICE DES PROBABILITES
  const matrice = generateMatrice3D(dico, alphabet); // this.afficherMatrice(matrice);
  
  // TABLE SIMPLE GENERATION
  const matriceSimple = generateMatriceSimple3D(matrice, alphabet, originality);

  // GENERATE
  // for (var i=1; i<=40; i++) {
  const wordLength = getWordLength();
  const word = generateWord(wordLength, matriceSimple, alphabet, originality);

  return word;
};

export default generate;