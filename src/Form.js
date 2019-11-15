import React from 'react';
import { Context } from './config/state.manager';
import Word from './Word';
import Parameter from './Parameter';
import generate from './generation/generate';
import {
  sonorityOptions,
  sizeOptions,
  originalityOptions,
  languageOptions
} from './constants';

const Form = () => {
  const { state, dispatch } = React.useContext(Context);
  const { parameters } = state;
  const [word, setWord] = React.useState();
  const [dictionary, setDictionary] = React.useState();
  const languageOption = languageOptions[parameters.language];
  
  const readDictionary = (option) => {
    fetch(option.path).then(response => {
        response.text().then(response => {
          response = response.split('\n');
          dispatch(
            { 
              type: option.function, 
              [option.dictionary]: response 
            }
          );
        });
      });
  };
  const onClick = () => {
    let newWord;
    if (!dictionary || dictionary.length === 0) {
      const language = languageOptions[parameters.language];
      const defaultDictionary = state[language.dictionary];
      newWord = generate(parameters, defaultDictionary);
    }
    else newWord = generate(parameters, dictionary);
    setWord(newWord);
  };

  React.useEffect(() => {
    languageOptions.forEach(
      option => readDictionary(option)
    );
  }, []);

  React.useEffect(() => {
    setDictionary(state[languageOption.dictionary]);
  }, [state[languageOption.dictionary]]);

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
