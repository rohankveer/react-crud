import React from 'react';
import * as userApi from '../../api/user-api';
import * as documentApi from '../../api/document-api';
import { loadSearchLayout } from '../../actions/search-layout-actions';
import { setQueryState } from '../../actions/user-actions';
import SearchForm from '../views/search-form';
import store from '../../store';

const SearchFormContainer = React.createClass({

  search: function(event) {
    event.preventDefault();

    // By assigning a "child" ref to <SearchForm />, we
    // can use that reference to gain access to the
    // .getQuery() method. See the code for
    // <SearchForm /> to see how it returns a value.
    let query = this.refs.child.getQuery();

    if (this.props.searchType === 'users') {
      // update in store
      store.dispatch(setQueryState(query));
      //userApi.searchUsers(query);
    } else if (this.props.searchType === 'documents') {
      // update in store
      store.dispatch(setQueryState(query));
      //documentApi.searchDocuments(query);
    }
  },

  render: function() {
    return (
      <SearchForm search={this.search} ref="child" />
    );
  }

});

export default SearchFormContainer;
