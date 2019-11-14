import React from 'react';
import { Context } from './config/state.manager';
import Word from './Word';
import Parameter from './Parameter';
import generate from './generation/generate';
import {
  sonorityOptions,
  sizeOptions,
  originalityOptions,
  languageOptions,
  // dicoOptions
} from './constants';

const Form = () => {
  const { state, dispatch } = React.useContext(Context);
  const { parameters, dico } = state;
  const [word, setWord] = React.useState();
  // const [dico, setDico] = React.useState();
  
  // console.warn('dico', dico.length);
  // console.warn('parameters', parameters);

  const onClick = () => {
    // console.log('onClick', parameters, dico.length)
    const newWord = generate(parameters, dico);
    setWord(newWord);
  };

  React.useEffect(() => {
    const language = languageOptions[parameters.language];
    console.log("language", language)
    const readDictionary = (path) => {
      fetch(path)
        .then(response => {
          response.text().then(response => {
            response = response.split('\n');
            // setDico(dico);
            dispatch({ type: 'setDico', dico: response });
          });
        });
    };
    readDictionary(language.path);
  }, [parameters.language]);

  return (
    <form>
      <div className="grid-y">
        <div className="cell small-12">
          <Word word={word} />
        </div>
        <div className="cell small-12">
          <Parameter title="Sonority" options={sonorityOptions} name='sonority' />
        </div>
        <div className="cell small-12">
          <Parameter title="Length" options={sizeOptions} name='length' />
        </div>
        <div className="cell small-12">
          <Parameter title="Originality" options={originalityOptions} name='originality' />
        </div>
        <div className="cell small-12">
          <Parameter title="Language" options={languageOptions} name='language'/>
        </div>
        <div className="cell small-12">
          <button onClick={onClick} type="button" className="success button">Générer</button>
        </div>
      </div>
    </form>
  );
};

export default Form;
