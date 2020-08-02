import React, { useRef, useContext, useEffect } from 'react'
import { ReactComponent as Add } from '../../assets/icons/add.svg'
import { ReactComponent as Remove } from '../../assets/icons/remove.svg'

import { GlobalContext } from '../../state/Store'

export default function Sources() {
  const [state, dispatch] = useContext(GlobalContext)
  
  const addSubredditInput = useRef()

  function addSubreddit () {
    const subredditName = addSubredditInput.current.value
    if (subredditName.length !== 0) {
      dispatch({
        type: 'ADD_SUBREDDIT',
        payload: subredditName
      })
    }
    addSubredditInput.current.value = ''
  }

  function removeSubreddit (subredditName) {
    dispatch({
      type: 'DELETE_SUBREDDIT',
      payload: subredditName
    })
  }

  return (
    <div>
      <div>
        <h3 className="title">Add a subreddit</h3><br></br>
        <div className="input-accept">
          <input className="input" placeholder="Subreddit name" ref={addSubredditInput} type="text"  style={{flexGrow: 1}}></input>
          <Add onClick={_ => addSubreddit()} className= "icon-button" />
        </div>
        {
          state.subreddits.map(element => {
            return (
              <div id="add-subreddits-listitem" key={element}>
                <p key={element}>{element}</p>
                <Remove className="icon-button" onClick={_ => removeSubreddit(element)} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
