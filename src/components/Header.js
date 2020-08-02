import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import { GlobalContext } from '../state/Store'

import {ReactComponent as Logo} from '../assets/logo.svg'
import {ReactComponent as Sun} from '../assets/icons/sun.svg'
import {ReactComponent as Moon} from '../assets/icons/moon.svg'


export default function Header() {
  const [theme, setTheme] = useState()
  const [themeDropdown, toggleThemeDropdown] = useState(false);

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

  return (
    <div className="header">
      {themeDropdown && <div className="overlay-invisible" onClick={_ => toggleThemeDropdown(false)}></div>}
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">
            <Logo className="nav-logo" />
          </Link>
        </li>
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
    </div>
  )
}
