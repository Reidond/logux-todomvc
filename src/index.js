import React from 'react'
import { render } from 'react-dom'
// import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'
import 'todomvc-app-css/index.css'
import { createLoguxCreator } from '@logux/redux'
import { badge, badgeEn, log } from '@logux/client';
import { badgeStyles } from '@logux/client/badge/styles';

const createStore = createLoguxCreator({
  subprotocol: '1.0.0',
  server: process.env.NODE_ENV === 'development'
    ? 'ws://localhost:31337'
    : 'wss://logux.example.com',
  userId: 'todo',  // TODO: We will fill it in next chapter
  token: '' // TODO: We will fill it in next chapter
});

const store = createStore(reducer)
badge(store.client, { messages: badgeEn, styles: badgeStyles });
log(store.client);
store.client.start();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
