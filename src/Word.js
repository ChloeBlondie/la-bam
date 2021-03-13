import React from 'react';
import PropTypes from 'prop-types';
import './App.scss';
// import { Context } from './config/state.manager';

const Word = (props) => {
  const { word } = props;
  return (
    <input className="word" value={word} readOnly />
  );
};

Word.propTypes = {
  word: PropTypes.string.isRequired,
};
Word.defaultProps = {
  word: 'canel'
};

export default Word;
