import * as ActionTypes from '../constants/ActionTypes';

const initialState = [{}];

const actionsMap = {
  [ActionTypes.PRODUCT_SUCCESS](state, action) {
    return action.data.body;
  },
  [ActionTypes.GET_PRODUCT](state) {
    return state;
  },
  [ActionTypes.PRODUCT_HAS_ERRORED](state) {
    return state;
  },
};

export default function products(state = initialState, action) {
  // TODO ensure the new products are getting added to the state and old ones are discarded on page change ??
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
