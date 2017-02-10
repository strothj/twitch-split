// import React, { PropTypes } from 'react';
import React from 'react';
import SelectedResult from '../SelectedResult';
// import { resultProps } from '../SearchResult';
import './SelectedResultsList.scss';

/* eslint-disable react/prop-types */
const SelectedResultsList = (props) => {
  const selectedResults = props.results.map(result => (
    <span key={result.id}>
      <SelectedResult {...result} onResultClicked={props.onResultClicked} />
      &nbsp;
    </span>
  ));

  let goButton = (
    <button className="go-button">
      <i className="fa fa-arrow-circle-right" aria-hidden="true" />
    </button>
  );
  if (selectedResults.length < 2) goButton = <div />;

  return (
    <div className="selected-results">
      {selectedResults}
      {goButton}
    </div>
  );
};
// SelectedResultsList.propTypes = PropTypes.arrayOf(PropTypes.shape(resultProps));

export default SelectedResultsList;
