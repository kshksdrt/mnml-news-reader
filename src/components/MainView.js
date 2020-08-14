import React, { useState } from 'react'
import { Route } from 'react-router-dom'

import Home from './MainView/Home'
import Sources from './MainView/Sources'
import About from './MainView/About'
import BottomNav from './BottomNav'

export default function MainView() {

  const [bottomNavState, setBottomNavState] = useState(true)

  function handleWheel (e) {
    if (e.deltaY > 0) setBottomNavState(false)
    if (e.deltaY < 0) setBottomNavState(true)
  }

  return (
    <div className="home-content" onWheel={e => handleWheel(e)}>
      <Route exact path="/" component={Home} />
      <Route exact path="/sources" component={Sources} />
      <Route exact path="/about" component={About} />
      <BottomNav visibility={bottomNavState} />
    </div>
  )
}
