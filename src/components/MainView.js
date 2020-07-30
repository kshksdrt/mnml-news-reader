import React, { useState } from 'react'
import Home from './MainView/Home'
import Sources from './MainView/Sources'
import About from './MainView/About'

export default function MainView() {
  const [view, setView] = useState('home')

  return (
    <div className="home-content">
      {view == 'home' && <Home />}
      {view == 'sources' && <Sources />}
      {view == 'about' && <About />}
    </div>
  )
}
