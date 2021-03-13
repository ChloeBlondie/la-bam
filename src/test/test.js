// cd ~/Documents/GitHub/la-bam/src/test
// const mots = require('./fr.js');
const prenom = require('./prenom.js');
const { 
  generateWord 
} = require('../generation/tools.js');
const {
  isExistingWord
} = require('../generation/helper.js');
const { 
  // generateMatriceSimple3D_v2,
  generateMatriceSimple3D_v2: generateMatriceSimple3D 
} = require('../generation/brain.js');

let matriceSimple3D;
const length = 30;

console.log(' ');
console.log('--------ORGINAL 4---------');
matriceSimple3D = generateMatriceSimple3D(prenom);
for (let i=1; i<=length; i++) {
  const word = generateWord(matriceSimple3D, 4);
  console.log(word, isExistingWord(prenom, word) ? '------------------' : '');
}

console.log(' ');
console.log('--------ORGINAL 1---------');
matriceSimple3D = generateMatriceSimple3D(prenom);
for (let i=1; i<=length; i++) {
  const word = generateWord(matriceSimple3D, 1);
  console.log(word, isExistingWord(prenom, word) ? '------------------' : '');
}

