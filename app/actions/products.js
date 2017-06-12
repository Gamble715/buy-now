import * as types from '../constants/ActionTypes';

function fetchProducts(permalink) {
  const url = `https://l4flre33of.execute-api.us-east-1.amazonaws.com/dev/products?permalink=${encodeURIComponent(permalink)}`;
  console.log('URL', url);
  return fetch(url);
}
export function getProductsCompleted(data) {
  return { type: types.PRODUCT_SUCCESS, data };
}
export function getProductsFailed(error) {
  return { type: types.PRODUCT_HAS_ERRORED, error };
}

export function getProducts(url) {
  return function (dispatch) {
    return fetchProducts(url)
      .then(response => response.text())
      .then(data => dispatch(getProductsCompleted(JSON.parse(data))))
      .catch(error => dispatch(getProductsFailed(error)));
  };
}
