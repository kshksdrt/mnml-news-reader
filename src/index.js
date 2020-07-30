import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './App';

import Store from './state/Store';

ReactDOM.render(
  <React.StrictMode>
    <Store>
      <App />
    </Store>
  </React.StrictMode>,
  document.getElementById('root')
);
