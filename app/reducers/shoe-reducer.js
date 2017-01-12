import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
  shoes: []
};

const shoeReducer = function(state = initialState, action) {

  switch(action.type) {

    case types.GET_SHOES_SUCCESS:
      return Object.assign({}, state, { shoes: action.shoes });
    case types.RESET_SHOE_STATE:
      return Object.assign({}, state, { shoes: [] });
  }

  return state;

}

export default shoeReducer;
