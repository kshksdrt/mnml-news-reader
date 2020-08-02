import React from 'react'
import { Route } from 'react-router-dom'

import Home from './MainView/Home'
import Sources from './MainView/Sources'
import About from './MainView/About'

export default function MainView() {

  return (
    <div className="home-content">
      <Route exact path="/" component={Home} />
      <Route exact path="/sources" component={Sources} />
      <Route exact path="/about" component={About} />
    </div>
  )
}
