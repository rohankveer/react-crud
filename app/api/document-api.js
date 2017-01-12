import axios from 'axios';
import store from '../store';
import { getDocumentsSuccess, deleteDocumentSuccess } from '../actions/document-actions';
var Config = require('Config');

/**
 * Get Documents
 */

export function getDocuments() {
    
  // add sort by query
  let sort_query = "";
  if(store.getState().filterState.filter.sortBy !== null ){
      sort_query = "?sortBy=" + store.getState().filterState.filter.sortBy.key + "&sortOrder=" + store.getState().filterState.filter.sortBy.order;
  }
    
  return axios.get(Config.getScans + sort_query)
    .then(response => {
      store.dispatch(getDocumentsSuccess(response.data.resources));
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Search Documents
 */

export function searchDocuments(query = '') {
  return axios.get('../../data/documents.json'+ query)
    .then(response => {
      store.dispatch(getDocumentsSuccess(response.data));
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Delete a document
 */

export function deleteDocument(documentId) {
  return axios.delete('../../data/documents.json' + documentId)
    .then(response => {
      store.dispatch(deleteDocumentSuccess(documentId));
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}
