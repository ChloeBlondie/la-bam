import React from 'react';
import { Context } from './config/state.manager';
import Word from './Word';
import Parameter from './Parameter';
import generate from './generation/generate';
import { sonorityOptions, sizeOptions, originalityOptions, languageOptions } from './constants';

const Form = () => {
  const { state, dispatch } = React.useContext(Context);
  const { parameters } = state;
  // const [word, setWord] = React.useState();
  const [words, setWords] = React.useState([]);
  const [dictionary, setDictionary] = React.useState();
  const languageOption = languageOptions[parameters.language];

  console.log("words", words);
  
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
  // const onClick = () => {
  //   let newWord;
  //   if (!dictionary || dictionary.length === 0) {
  //     const language = languageOptions[parameters.language];
  //     const defaultDictionary = state[language.dictionary];
  //     newWord = generate(parameters, defaultDictionary);
  //   }
  //   else newWord = generate(parameters, dictionary);
  //   setWord(newWord);
  // };
  const onClick50 = () => {
    let newWords = [];
    let dictio = dictionary;
    
    if (!dictionary || dictionary.length === 0) {
      const language = languageOptions[parameters.language];
      dictio = state[language.dictionary];
    }
    console.log("dictio", dictio)
    for(var i=0; i<100; i++) {
      newWords.push(generate(parameters, dictio));
    }
    setWords(newWords);
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
    <div>
      {/* <div className="grid-y"> */}
        {/* <div className="">
          <Parameter title="Originalité" options={originalityOptions} name='originality' />
        </div> */}
        <div className="">
          <button onClick={onClick50} type="button" className="success button">Générer</button>
        </div>
      {/* </div> */}
      <div className="">
          {words.length 
            ? words.map(word => {
                const n = Math.floor(Math.random() * 10);
                return (
                  <input size={word.length + 2} className={`tag-word tag-color-${n}`} value={word} readOnly />
                );
              }
            ) : null
          }
        </div>
    </div>
    
    //     <div className="cell small-12">
    //       <Word word={word} />
    //     </div>
    //     {/* <textarea id="w3review" name="w3review" rows="6" cols="50" value={words} /> */}
    //     {/* <div className="cell small-12">
    //       <Parameter title="Originalité" options={originalityOptions} name='originality' />
    //     </div> */}
    //     {/* <div class="cell small-12 slidecontainer">
    //       <input 
    //         type="range" 
    //         min="1" 
    //         max="100" 
    //         // value="50" 
    //         class="slider" 
    //         id="myRange" 
    //       />
    //     </div> */}
    //     {/* <div className="cell small-12">
    //       <Parameter title="Sonorité" options={sonorityOptions} name='sonority' />
    //     </div> */}
    //     {/* <div className="cell small-12">
    //       <Parameter title="Longueur" options={sizeOptions} name='length' />
    //     </div> */}
       
    //     {/* <div className="cell small-12">
    //       <Parameter title="Language" options={languageOptions} name='language'/>
    //     </div> */}
    //     {/* <div className="cell small-12">
    //       <button onClick={onClick} type="button" className="success button">Générer</button>
    //     </div>
    //     <div className="cell small-12">
    //       <button onClick={onClick50} type="button" className="success button">Générer 50</button>
    //     </div> */}
    //   {/* </div>
    // </form> */}
  );
};

export default Form;
