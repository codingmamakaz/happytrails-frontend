import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css';
import store from './store.js'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import 'bulma-helpers/css/bulma-helpers.min.css'


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));

