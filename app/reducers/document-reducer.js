import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
  documents: []
};

const documentReducer = function(state = initialState, action) {

  switch(action.type) {

    case types.GET_DOCUMENTS_SUCCESS:
      return Object.assign({}, state, { documents: action.documents });

    case types.DELETE_DOCUMENT_SUCCESS:

      // Use lodash to create a new document array without the document we want to remove
      const newDocuments = _.filter(state.documents, document => document.id != action.documentId);
      return Object.assign({}, state, { documents: newDocuments })

  }

  return state;

}

export default documentReducer;
