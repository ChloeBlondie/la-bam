import React from 'react';
import PropTypes from 'prop-types';
import './App.scss';
// import { Context } from './config/state.manager';

const Word = (props) => {
  const { word } = props;
  return (
    <div className="word">
      {word}
    </div>
  );
};

Word.propTypes = {
  word: PropTypes.string.isRequired,
};

export default Word;
