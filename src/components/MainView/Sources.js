import React, { useRef, useContext, useEffect } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import { GlobalContext } from '../../state/Store'

const LS_SUBREDDITS_KEY = 'newsPanda.subreddits'

export default function Sources() {
  const [lsSubreddits, saveSubredditsToLs] = useLocalStorage(LS_SUBREDDITS_KEY)
  const [state, dispatch] = useContext(GlobalContext)
  
  const addSubredditInput = useRef()

  useEffect(_ => {
    saveSubredditsToLs(state.subreddits)
  }, [state.subreddits])

  useEffect(_ => {
    dispatch({
      type: 'IMPORT_SUBREDDITS_LIST',
      payload: lsSubreddits
    })
  }, [])

  async function addSubreddit () {
    const subredditName = addSubredditInput.current.value
    if (subredditName !== 0) {
      dispatch({
        type: 'ADD_SUBREDDIT',
        payload: subredditName
      })
    }
    addSubredditInput.current.value = ''
  }

  return (
    <div>
      <div className="flex-row">
        <input ref={addSubredditInput} type="text" />
        <button onClick={_ => addSubreddit()}>Add</button>
        {
          state.subreddits.map(element => {
            return <p key={element}>{element}</p>
          })
        }
      </div>
    </div>
  )
}
