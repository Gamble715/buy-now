import { wrapStore } from 'react-chrome-redux';
import { getProducts } from '../../app/actions/products';

const createStore = require('../../app/store/configureStore');

const bluebird = require('bluebird');

global.Promise = bluebird;

const store = createStore({});

wrapStore(store, { portName: 'BUY_NOW' });

// chrome.runtime.onMessage.addListener((request) => {
//   // TODO perhaps iterate here and call the actions individually?
//   console.log('LINKS', request.permalinks);
//   const links = request.permalinks;
//   for (let i = 0; i < links.length; i += 1) {
//     console.log('SEARCHING FOR CONTENT');
//     store.dispatch(getProducts(links[i]));
//   }
// });

chrome.webRequest.onCompleted.addListener((details) => {
  console.log('DETAILS', details);
  store.dispatch(getProducts(details.url));
}, { urls: ['https://www.instagram.com/p/*', 'https://www.pinterest.com/pin/*'] });

function promisifier(method) {
  // return a function
  return function promisified(...args) {
    // which returns a promise
    return new Promise((resolve) => {
      args.push(resolve);
      method.apply(this, args);
    });
  };
}

function promisifyAll(obj, list) {
  list.forEach(api => bluebird.promisifyAll(obj[api], { promisifier }));
}

// let chrome extension api support Promise
promisifyAll(chrome, [
  'tabs',
  'windows',
  'browserAction',
  'contextMenus'
]);
promisifyAll(chrome.storage, [
  'local',
]);

require('./background/contextMenus');
require('./background/inject');
require('./background/badge');
