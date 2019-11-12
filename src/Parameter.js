import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';

const Parameter = (props) => {
  const { title, options } = props;
  return (
    <>
      <label className="title-label" htmlFor="sonority-label">
        {title}
        <select className="select" id="sonority-label">
          { map(options, (option) => (<option key={option.value}>{option.label}</option>))}
        </select>
      </label>
      {/* <p className="help-text" id="passwordHelpText">
        Select a
        {' '}
        {title}
      </p> */}
    </>
  );
};

Parameter.propType = {
  title: PropTypes.string,
  options: PropTypes.object,
};

export default Parameter;
