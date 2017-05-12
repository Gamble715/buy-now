import React from 'react';
import ReactDOM from 'react-dom';
import { Store } from 'react-chrome-redux';
import Root from '../../app/containers/Root';
import './todoapp.css';

const store = new Store({
  portName: 'BUY_NOW' // communication port name
});
store.ready().then(() => {
  ReactDOM.render(
    <Root store={store} />,
    document.querySelector('#root')
  );
});
