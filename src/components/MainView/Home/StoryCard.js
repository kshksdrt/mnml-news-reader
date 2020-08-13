import React from 'react'

export default function StoryCard({ story }) {
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
