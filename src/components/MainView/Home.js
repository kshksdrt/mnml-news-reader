import React, { useContext, useEffect, useState } from 'react'
import Content from './Home/Content'
import { GlobalContext } from '../../state/Store'

export default function Home() {
  const [state] = useContext(GlobalContext)
  const [currentTab, setCurrentTab] = useState(state.subreddits[0])

  useEffect(_ => {
    setCurrentTab(state.subreddits[0])
  }, [state.subreddits])

  return (
    <div>
      <div className="tabs">
        {
          state.subreddits.map(element => {
            return (
              <div
              className={`tab-item ${currentTab === element ? 'tab-active' : ''}`}
              onClick={_ => setCurrentTab(element)}
              key={element}
              >
                <span>{element}</span>
              </div>
            )
          })
        }
      </div>
      <Content subredditName={currentTab} />
    </div>
  )
}
