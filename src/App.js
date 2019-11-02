import React from 'react';
import './App.scss';
import Sonority from './Sonority';
import { Provider, Context } from './config/state.manager';
import Word from './Word';

const App = () => {
  const { state } = React.useContext(Context);
  console.log('state', state);
  // const { word } = 'cucu'; // state;

  return (
    <Provider>
      <div className="App">
        <header className="App-header">
          <form>
            <div className="grid-y">
              <div className="cell small-12">
                <Word />
              </div>
              <div className="cell small-12">
                <Sonority />
              </div>
              <div className="cell small-12">
                <Sonority />
              </div>
              <div className="cell small-12">
                <button type="button" className="success button">Générer</button>
              </div>
            </div>
          </form>
        </header>
      </div>
    </Provider>
  );
};

export default App;
