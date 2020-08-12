import React, {createContext, useReducer, useEffect} from "react";
import reducer from './Reducer';
import useLocalStorage from "../hooks/useLocalStorage";
import news from '../assets/news.json'
import technology from '../assets/technology.json'

const defaultState = {
  theme: 'light',
  subreddits: ['technology', 'news'],
  developmentJson: { news, technology }
}

const LS_KEYS = {
  subreddits: 'mnlm-news-reader.subreddits',
  theme: 'mnlm-news-reader.theme'
}

export const GlobalContext = createContext(defaultState);

export default function Store({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const [lsSubreddits, saveSubredditsToLs] = useLocalStorage(LS_KEYS.subreddits, defaultState.subreddits)
  const [lsTheme, saveThemeToLs] = useLocalStorage(LS_KEYS.theme, defaultState.theme)

  // Saves to Local Storage
  useEffect(_ => {
    saveSubredditsToLs(state.subreddits)
  }, [state.subreddits])

  useEffect(_ => {
    saveThemeToLs(state.theme)
  }, [state.theme])

  // Loads from Local Storage
  useEffect(_ => {
    dispatch({
      type: 'IMPORT_SUBREDDITS_LIST',
      payload: lsSubreddits
    })
    dispatch({
      type: 'SET_THEME',
      payload: lsTheme
    })
  }, [])

  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalContext.Provider>
  )
}