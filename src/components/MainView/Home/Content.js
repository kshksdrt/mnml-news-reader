import React, { useContext } from 'react'
import { GlobalContext } from '../../../state/Store'
import StoryCard from './StoryCard'

export default function Content({subredditName}) {
  const [state, dispatch] = useContext(GlobalContext)

  return (
    <div>
      <div style={{overflowWrap: "normal", margin: "0px 16px"}}>
        {state.developmentJson[subredditName] && state.developmentJson[subredditName].data.children.map(story => {
          return (
            <StoryCard key={story.data.name} storyFull={story.data} />
          )
        })}
      </div>
    </div>
  )
}
