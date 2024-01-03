import React from 'react';
import ReactDOM from 'react-dom';
import {store} from './helper/store'
import { Provider } from 'react-redux'
import Routes from './common/route'
import './index.css';
import './Css/style.css'
import './Css/login.css'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <Routes />
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
 