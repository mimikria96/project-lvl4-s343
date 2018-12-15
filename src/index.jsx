import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import App from './components/App.jsx';
import startSlack from './socket.js';


/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);

export default ({ channels, messages, currentChannelId }) => {
  const store = createStore(
    reducers,
    { channels, messages, currentChannelId },
    enhancer,
  );
  startSlack(store);
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('container'),
  );
};
