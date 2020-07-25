import React, { useState, useEffect } from 'react'
import {ReactComponent as Logo} from '../assets/logo.svg'
import {ReactComponent as Sun} from '../assets/sun.svg'
import {ReactComponent as Moon} from '../assets/moon.svg'
import useLocalStorage from '../hooks/useLocalStorage'

const LS_THEME_KEY = 'newsPanda.theme';

export default function Header({ onThemeChange }) {
  const [lsTheme, saveThemeToLs] = useLocalStorage(LS_THEME_KEY, 'light')

  const [theme, setTheme] = useState('light')
  const [themeDropdown, toggleThemeDropdown] = useState(false);

  useEffect(() => {
    onThemeChange(theme)
    saveThemeToLs(theme)
  }, [theme])

  useEffect(() => {
    onThemeChange(lsTheme)
    saveThemeToLs(lsTheme)
  }, [lsTheme])

  return (
    <div className="header">
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
            <div onClick={_ => setTheme('light')}>
              <Sun/>
              <p>Light</p>
            </div>
            <hr></hr>
            <div onClick={_ => setTheme('dark')}>
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
