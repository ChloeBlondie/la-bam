import React from 'react';
import './App.css';
import { 
  sonorityOptions,
  // sizeOptions,
  // originalityOptions,
  // languageOptions
} from './constants.js';
import map from 'lodash/map';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        {/* <div class="container"> */}
        <form>
          <div class="form-group">

            <div class="form-group">
              <label for="sonority">Sonorité</label>
              <select class="form-control" id="sonority">
                {map(sonorityOptions, option => <option key={option.value}>{option.label}</option>)}
              </select>
              <small id="sonorityHelp" class="form-text text-muted">Choisis une sonorité</small>
            </div>

            <button type="submit" class="btn btn-primary">Générer</button>
          </div>

        </form>
      </header>
    </div>
  );
}

export default App;
