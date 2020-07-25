import React, { useState } from 'react';
import './assets/App.css';

import Header from './components/Header'
import News from './components/News'

function App() {  
  const [theme, setTheme] = useState('light')
  
  function changeAppTheme (newTheme) {
    setTheme(newTheme)
  }
  
  return (
    <div className={"app " + theme}>
      <div className="home">
        <Header onThemeChange={changeAppTheme}/>
        <div className="home-content">
          <p>Welcome!</p>
        </div>
        <div className="footer"></div>
      </div>
    </div>
  );
}

export default App;
