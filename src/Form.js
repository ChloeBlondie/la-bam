import React from 'react';
import { Context } from './config/state.manager';
import Word from './Word';
import Parameter from './Parameter';
// import wordGeneration from './generation/wordGeneration';
import {
  sonorityOptions,
  sizeOptions,
  originalityOptions,
  languageOptions,
} from './constants';

const Form = () => {
  const { state, dispatch } = React.useContext(Context);
  const [word, setWord] = React.useState();
  console.log('state', state);

  const onClick = () => {
    // const newWord = wordGeneration.generate();
    // setWord(newWord);
  };

  React.useEffect(() => {
    const readDictionary = () => {
      fetch('dictionaries/francais.txt')
        .then((r) => r.text())
        .then((text) => {
          const formatedText = text.split('\n');
          dispatch({ type: 'setDico', dico: formatedText });
          console.log('formatedText', formatedText);
        });
    };
    readDictionary();
  }, []);

  return (
    <form>
      <div className="grid-y">
        <div className="cell small-12">
          <Word word={word} />
        </div>
        <div className="cell small-12">
          <Parameter title="Sonority" options={sonorityOptions} />
        </div>
        <div className="cell small-12">
          <Parameter title="Length" options={sizeOptions} />
        </div>
        <div className="cell small-12">
          <Parameter title="Originality" options={originalityOptions} />
        </div>
        <div className="cell small-12">
          <Parameter title="Language" options={languageOptions} />
        </div>
        <div className="cell small-12">
          <button onClick={onClick} type="button" className="success button">Générer</button>
        </div>
      </div>
    </form>
  );
};

export default Form;
