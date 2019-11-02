import React from 'react';
import map from 'lodash/map';
import {
  sonorityOptions,
// sizeOptions,
// originalityOptions,
// languageOptions
} from './constants';

const Sonority = (props) => {
  const { sonority } = props;
  return (
    <>
      <label className="title-label" htmlFor="sonority-label">
        Sonority
        <select className="select" id="sonority-label">
          { map(sonorityOptions, (option) => (<option key={option.value}>{option.label}</option>))}
        </select>
      </label>
      <p className="help-text" id="passwordHelpText">Select a sonority</p>
    </>
  );
};

export default Sonority;
