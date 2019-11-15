import React, { useReducer } from 'react';

const initialState = {
  word: '...',
  dictioFr: [],
  dictioEn: [],
  dictioDe: [],
  dictioEs: [],
  dictioIt: [],
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
    case 'setDictioFr': {
      return {
        ...state,
        dictioFr: action.dictioFr || state.dictioFr,
      };
    }
    case 'setDictioEn': {
      return {
        ...state,
        dictioEn: action.dictioEn || state.dictioEn,
      };
    }
    case 'setDictioDe': {
      return {
        ...state,
        dictioDe: action.dictioDe || state.dictioDe,
      };
    }
    case 'setDictioEs': {
      return {
        ...state,
        dictioEs: action.dictioEs || state.dictioEs,
      };
    }
    case 'setDictioIt': {
      return {
        ...state,
        dictioIt: action.dictioIt || state.dictioIt,
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
