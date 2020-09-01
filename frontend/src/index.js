import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux'

import App from './components/app';
import { getItems } from './actions/list-item-actions';
import rootReducer from './reducers/root-reducer'

import './index.css';

const store = createStore(rootReducer, applyMiddleware(thunk))
store.dispatch(getItems());
ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}> 
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
