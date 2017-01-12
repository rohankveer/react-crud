import React from 'react';
import { connect } from 'react-redux';
import DocumentList from '../views/document-list';
import * as documentApi from '../../api/document-api';
import store from '../../store';
import { loadSearchLayout } from '../../actions/search-layout-actions';
import { setFilterState } from '../../actions/user-actions';

const DocumentListContainer = React.createClass({

  getInitialState: function() {
        return {
            sortBy: {
                key: "name",
                order: "ascending"
            },
        }
  },

  sortByClick: function(sort_by){

      // call api here to get sorted data
      let sort_order = {
                  key: null,
                  order: null
              }
      if(this.state.sortBy.key == sort_by.key){
          let order = (this.state.sortBy.order == "ascending") ? "descending" : "ascending";
           sort_order = {
                  key: sort_by.key,
                  order: order
              }
      } else {
          sort_order = {
                  key: sort_by.key,
                  order: sort_by.order
              }
      }
      this.setState({
              sortBy: sort_order,
            });

      // update store filter criteria
      store.dispatch(setFilterState(sort_order));
      documentApi.getDocuments();
  },

  componentDidMount: function() {
    documentApi.getDocuments();
    store.dispatch(loadSearchLayout('documents', 'Document Results'));
  },

  render: function() {
    return (
      <DocumentList documents={this.props.documents} deleteDocument={documentApi.deleteDocument} sort={this.sortByClick} sortBy={this.state.sortBy} />
    );
  }

});

const mapStateToProps = function(store) {
  return {
    documents: store.documentState.documents
  };
};

export default connect(mapStateToProps)(DocumentListContainer);
