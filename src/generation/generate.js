import { generateWord } from './tools';
import { generateMatriceSimple3D_v2} from './brain';

const generate = (parameters, dictionary) => {
  const { sonority, length, originality } = parameters;

  console.log("originality", originality)

  const matriceSimple3D = generateMatriceSimple3D_v2(dictionary);
  const word = generateWord(matriceSimple3D, originality);

  return word;
};

export default generate;