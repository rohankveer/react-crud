import React from 'react';
import { connect } from 'react-redux';
import DocumentList from '../views/document-list';
import * as documentApi from '../../api/document-api';
import store from '../../store';
import { loadSearchLayout } from '../../actions/search-layout-actions';

const DocumentListContainer = React.createClass({

  componentDidMount: function() {
    documentApi.getDocuments();
    store.dispatch(loadSearchLayout('documents', 'Document Results'));
  },

  render: function() {
    return (
      <DocumentList documents={this.props.documents} deleteDocument={documentApi.deleteDocument} />
    );
  }

});

const mapStateToProps = function(store) {
  return {
    documents: store.documentState.documents
  };
};

export default connect(mapStateToProps)(DocumentListContainer);
