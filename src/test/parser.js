
var fs = require("fs");
let list = [];
let data = '';
var readStream = fs.createReadStream('countries.txt', 'utf8');
const { generateMatriceSimple3D, generateWord } = require('../generation/tools.js');

readStream.on('data', function(chunk) {
    // data += chunk;
    // console.log("chunk", chunk)
    chunk = chunk.toString();
    chunk = chunk.toLowerCase();
    chunk = chunk.replace(/à|â|ä/g, "a");
    chunk = chunk.replace(/é|è|ê|ë/g, "e");
    chunk = chunk.replace(/î|ï/g, "i");
    chunk = chunk.replace(/ô|ö/g, "o");
    chunk = chunk.replace(/û|ü/g, "u");
    chunk = chunk.replace(/ÿ/g, "y");
    chunk = chunk.replace(/ç/g, "c");
    chunk = chunk.replace(/-|&| |{|}/g, "");
    data = chunk.split("\n");

    // data += mot;
}).on('end', function() {
    console.log("fini", data);
    let originality = 4;
    const matriceSimple3D = generateMatriceSimple3D(data, originality);
    
    for (var i=1; i<=20; i++) {
        const word = generateWord(matriceSimple3D, originality);
        console.log("mot", i, word);
        // console.log(wordLength, "mot", i, word);
    }
});



