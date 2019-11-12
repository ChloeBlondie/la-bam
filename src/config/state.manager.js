import React, { useReducer } from 'react';

const initialState = {
  word: 'coucou',
  dico: [],
};

const Context = React.createContext(initialState);

const reducer = (state, action) => {
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
    default:
      return state;
  }
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log('Provider', state);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
