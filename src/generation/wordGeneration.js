import React from 'react';
import PropTypes from 'prop-types';
// import indexOf from 'lodash/indexOf';
// import max from 'lodash/max';
// import find from 'lodash/find';

// const filePath = 'mot.txt';
// var generator = require('./generator.js');

// const readFile = () => {
//   const xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = () => {
//     if (this.readyState === 4 && this.status === 200) {
//       this.words = this.responseText;
//       this.words = this.words.split('\n');
//     }
//   };
//   xhttp.open('GET', 'http://localhost:3000/fr.txt', true);
//   xhttp.send();
// };

const wordGeneration = (props) => {
  const {
    sonorite,
    longueur,
    originalite,
    language,
    // current_dictionary,
  } = props;

  React.useEffect(() => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (this.readyState === 4 && this.status === 200) {
        console.log('this', this);
        // this.words = this.responseText;
        // this.words = this.words.split('\n');
      }
    };
    xhttp.open('GET', 'http://localhost:3000/fr.txt', true);
    xhttp.send();
  }, []);

  console.log('sonorite', sonorite);
  console.log('longueur', longueur);
  console.log('originalite', originalite);
  console.log('language', language);

  const [word, setWord] = React.useState();

  // this.current_dictionary = props.current_dictionary;
  // this.generator = new generator();
};

wordGeneration.propTypes = {
  sonorite: PropTypes.string,
  longueur: PropTypes.string,
  originalite: PropTypes.string,
  language: PropTypes.string,
  // current_dictionary: PropTypes.array,
};

export default wordGeneration;
