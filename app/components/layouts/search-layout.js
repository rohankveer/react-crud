import React from 'react';
import SearchFormContainer from '../containers/search-form-container';

// Using "Stateless Functional Components"
export default function(props) {
  return (
    <div className="search">
      <div className="search-results">
        {props.children}
      </div>
    </div>
    );
}
