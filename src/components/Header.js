import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import { GlobalContext } from '../state/Store'
import useBreakpoints from '../hooks/useBreakpoints'

import {ReactComponent as Logo} from '../assets/logo.svg'
import {ReactComponent as Sun} from '../assets/icons/sun.svg'
import {ReactComponent as Moon} from '../assets/icons/moon.svg'

export default function Header() {
  const [theme, setTheme] = useState()
  const [themeDropdown, toggleThemeDropdown] = useState(false);
  const { type } = useBreakpoints()

  const [state, dispatch] = useContext(GlobalContext)
  
  useEffect(_ => {
    dispatch({
      type: 'SET_THEME',
      payload: theme
    })
  }, [theme])

  function onThemeSelected (value) {
    setTheme(value)
    toggleThemeDropdown(false)
  }

  function toggleTheme () {
    if (state.theme === 'light') setTheme('dark')
    if (state.theme === 'dark') setTheme('light')
  }

  return (
    <div className="header">
      {themeDropdown && <div className="overlay-invisible" onClick={_ => toggleThemeDropdown(false)}></div>}
      <div className="navbar">
        <Link to="/" className="navbar-logo-container">
          <Logo className="nav-logo" />
        </Link>
        {type !== 'xs' && (
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/sources">Sources</Link>
            </li>
            <li className="nav-item dropdown-trigger">
              <a onClick={_ => toggleThemeDropdown(themeDropdown => !themeDropdown)}>Theme</a>
              {themeDropdown && <div className="dropdown-target">
                <div onClick={_ => onThemeSelected('light')}>
                  <Sun/>
                  <p>Light</p>
                </div>
                <hr></hr>
                <div onClick={_ => onThemeSelected('dark')}>
                  <Moon/>
                  <p>Dark</p>
                </div>
              </div>}
            </li>
            <li className="nav-item">
              <Link to="/about">About</Link>
            </li>
          </ul>
        )}
        {type === 'xs' && (
          <div id="themeToggler" onClick={toggleTheme}>
            {state.theme === 'dark' && <Sun />}
            {state.theme === 'light' && <Moon />}
          </div>
        )}
      </div>
    </div>
  )
}
