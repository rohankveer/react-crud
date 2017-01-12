import * as types from '../actions/action-types';

export function getDocumentsSuccess(documents) {
  return {
    type: types.GET_DOCUMENTS_SUCCESS,
    documents
  };
}

export function deleteDocumentSuccess(documentId) {
  return {
    type: types.DELETE_DOCUMENT_SUCCESS,
    documentId
  };
}
