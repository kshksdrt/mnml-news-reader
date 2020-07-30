import React, { useState, useEffect, useContext } from 'react'

import useLocalStorage from '../hooks/useLocalStorage'
import { GlobalContext } from '../state/Store'

import {ReactComponent as Logo} from '../assets/logo.svg'
import {ReactComponent as Sun} from '../assets/sun.svg'
import {ReactComponent as Moon} from '../assets/moon.svg'

const LS_THEME_KEY = 'newsPanda.theme';

export default function Header() {
  const [lsTheme, saveThemeToLs] = useLocalStorage(LS_THEME_KEY, 'light')

  const [theme, setTheme] = useState(lsTheme)
  const [themeDropdown, toggleThemeDropdown] = useState(false);

  const [state, dispatch] = useContext(GlobalContext)
  
  useEffect(_ => {
    dispatch({
      type: 'SET_THEME',
      payload: theme
    })
    saveThemeToLs(theme)
  }, [theme, lsTheme])

  function onThemeSelected (value) {
    setTheme(value)
    toggleThemeDropdown(false)
  }

  return (
    <div className="header">
      {themeDropdown && <div className="overlay-invisible" onClick={_ => toggleThemeDropdown(false)}></div>}
      <ul className="nav-list">
        <li className="nav-item">
          <a href="#">
            <Logo className="nav-logo" />
          </a>
        </li>
        <li className="nav-item">
          <a href="#">Home</a>
        </li>
        <li className="nav-item">
          <a href="#">Sources</a>
        </li>
        <li className="nav-item dropdown-trigger">
          <a href="#" onClick={_ => toggleThemeDropdown(themeDropdown => !themeDropdown)}>Theme</a>
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
          <a href="#">About</a>
        </li>
      </ul>
    </div>
  )
}
