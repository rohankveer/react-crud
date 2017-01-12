import * as types from '../actions/action-types';

export function getShoesSuccess(shoes) {
  return {
    type: types.GET_SHOES_SUCCESS,
    shoes
  };
}

export function resetShoeState() {
  return {
    type: types.RESET_SHOE_STATE,
  };
}
