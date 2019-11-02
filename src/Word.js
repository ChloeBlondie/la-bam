import React from 'react';
import './App.scss';
import { Context } from './config/state.manager';

const Word = () => {
  const { state } = React.useContext(Context);
  console.log('state', state);
  const { word } = state;

  return (
    <>
      {word}
    </>
  );
};

export default Word;
