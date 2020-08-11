import React, { useState, useEffect } from 'react'

function getReadableTime (ms) {
  const seconds = ( ms / 1000 ).toFixed(1)
  const minutes = ( ms / ( 1000 * 60 ) ).toFixed(1)
  const hours = ( ms / ( 1000 * 60 * 60 ) ).toFixed(1)
  const days = ( ms / ( 1000 * 60 * 60 * 24 ) ).toFixed(1)
  
  if (seconds < 60) return `${Math.floor(seconds)} seconds ago`
  if (minutes < 60) return `${Math.floor(minutes)} minutes ago`
  if (hours < 60) return `${Math.floor(hours)} hours ago`
  if (days < 60) return `${Math.floor(days)} days ago`
}

export default function StoryCard({ storyFull }) {
  const [story, setStory] = useState(storyFull)

  useEffect(_ => {
    const { title, score, domain, url, permalink, created, name, ...rest} = storyFull
    const time = getReadableTime(Date.now() - (created * 1000))
    setStory({ title, score, domain, url, permalink, time, name })
  }, [storyFull])

  function openInReddit (permalink) {
    window.open(`https://www.reddit.com/${permalink}`, '_blank', 'noopener noreferrer')
  }

  return (
    <div className="storycard">
      <p className="storycard-title" onClick={_ => openInReddit(story.permalink)}>{story.title}</p>
      <div className="storycard-info">
        <p className="info-orange">{`${story.score} points`}</p>
        <a className="info-blue link" href={story.url} target="_blank" rel="noopener noreferrer">{story.domain}</a>
        <p className="info-gray">{story.time}</p>
      </div>
    </div>
  )
}
