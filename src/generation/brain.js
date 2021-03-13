const max = require('lodash/max');
const {
    getAlphabet,
    generateMatrice3D
  } = require('./helper');

/*
Matrice contient 0, 1, 2, 3, ou 4
les % sont calculés sur le total de la ligne ([x][y] = total de cette row)
*/
const generateMatriceSimple3D = (dictionary) => {
    const matriceSimple3d = [];
    const alphabet = getAlphabet();
     // MATRICE DES PROBABILITES
    const { matrice } = generateMatrice3D(dictionary);
    
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
/*
 Matrice contient 0, 1, 2, 3, ou 4
 Mais les % sont calculés sur le total de toutes les cases [][][]
 */
const generateMatriceSimple3D_v2 = (dictionary) => {
    const matriceSimple3d = [];
    const alphabet = getAlphabet();
     // MATRICE DES PROBABILITES
    const { matrice, max } = generateMatrice3D(dictionary);

    for (let i = 0; i <= alphabet.length; i++) {
      const matriceSimple2d = [];
  
      for (let ii = 0; ii < alphabet.length; ii++) {
        const row = matrice[i][ii];
  
        const tabEnPourcentage = [];
        row.forEach((item, index) => {
          tabEnPourcentage[index] = Math.round(100 * (item / max) * 10000) / 10000;
        });
  
        // find max M % of letter following index letter
        // var M = max(tabEnPourcentage);
        const tabSimple = [];
        var M = max;
        // create a table simplifying tabEnPourcentage depending on max M and %
        tabEnPourcentage.forEach((item, index) => {
            if (item === 0) tabSimple[index] = null;
            else if (item <= 1) tabSimple[index] = 0;
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

module.exports.generateMatriceSimple3D = generateMatriceSimple3D;
module.exports.generateMatriceSimple3D_v2 = generateMatriceSimple3D_v2;
