import * as types from '../actions/action-types';

const initialState = {
  filter:{
    query: null,
    sortBy: {
            key: "name",
            order: "ascending"
        }
    }
};

const filterState = function(state = initialState, action) {

  switch(action.type) {

    case types.SET_FILTER_STATE:
      return Object.assign({}, state, { filter:{ query: state.filter.query, sortBy: action.filter } });

    case types.SET_QUERY_STATE:
      return Object.assign({}, state, { filter:{ query: action.query, sortBy: state.filter.sortBy } });

  }

  return state;

}

export default filterState;
