import {
  generateMatriceSimple3D,
  generateWord
} from './tools';

const generate = (parameters, dictionary) => {
  const { sonority, length, originality } = parameters;

  const matriceSimple3D = generateMatriceSimple3D(dictionary, originality);
  const word = generateWord(matriceSimple3D, originality);

  return word;
};

export default generate;