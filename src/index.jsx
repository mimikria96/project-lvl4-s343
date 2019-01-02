import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import Cookies from 'js-cookie';
import _ from 'lodash';
import reducers from './reducers';
import App from './components/App.jsx';
import startSlack from './socket.js';
import CookieContext from './contextes/cookieContext';


/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);

const userName = Cookies.get('UserName');

export default ({ channels, messages, currentChannelId }) => {
  const gonMessages = messages.filter(m => m.channelId === currentChannelId);
  const store = createStore(
    reducers,
    {
      channels: _.keyBy(channels, 'id'),
      messages: _.keyBy(gonMessages, 'id'),
      currentChannelId,
    },
    enhancer,
  );
  startSlack(store);
  render(
    <Provider store={store}>
      <CookieContext.Provider value={userName}>
        <App />
      </CookieContext.Provider>
    </Provider>,
    document.getElementById('container'),
  );
};
