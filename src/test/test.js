const mots = require('./fr.js');
const prenom = require('./prenom.js');
const { 
  getRandomInt,
  generateMatrice3D,
  generateMatriceSimple3D,
  generateWord
} = require('../generation/tools.js');

let originality = 3;
originality = getRandomInt(1,4);
originality = 4;

console.log("--ORIGINALITY--", originality)

// const matrice = generateMatrice3D(mots);
// afficherMatrice(matrice);

const matriceSimple3D = generateMatriceSimple3D(prenom, originality);

for (var i=1; i<=50; i++) {

  const word = generateWord(matriceSimple3D, originality);
  console.log("mot", i, word);
	// console.log(wordLength, "mot", i, word);
}