import React, {createContext, useReducer} from "react";
import reducer from './Reducer';

const defaultState = {
  theme: 'light',
  subreddits: ['news', 'technology'],
}

export const GlobalContext = createContext(defaultState);

export default function Store({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalContext.Provider>
  )
}
