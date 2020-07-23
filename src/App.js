import React from 'react';
import logo from './assets/logo.svg';
import './assets/App.css';
import News from './components/News.js'

function App() {
  return (
    <div className="home">
      <div className="header"></div>
      <div className="home-content">
        <News/>
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
