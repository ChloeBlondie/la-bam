import React, { useReducer } from 'react';

const initialState = {
  word: '...',
  dico: [],
  parameters: {
    sonority: 0, 
    originality: 0, 
    language: 0, 
    length: 0
  }
};

const Context = React.createContext(initialState);

const reducer = (state, action) => {
  // console.log(state, action)
  switch (action.type) {
    case 'init': {
      return {
        ...state,
      };
    }
    case 'setWord': {
      return {
        ...state,
        word: action.word || state.word,
      };
    }
    case 'setDico': {
      return {
        ...state,
        dico: action.dico || state.dico,
      };
    }
    case 'setParameters': {
      return {
        ...state,
        parameters: action.parameters || state.parameters,
      };
    }
    default:
      return state;
  }
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log('Provider', state);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
