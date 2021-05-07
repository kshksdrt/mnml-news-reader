import React from "react";

interface Props {
  story: Record<string, any>;
}

const StoryCard: React.FC<Props> = ({ story }) => {
  return (
    <div className="storycard">
      <a
        className="storycard-title"
        href={`https://www.reddit.com/${story.permalink}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {story.title}
      </a>
      <div className="storycard-info">
        <p className="info-orange">{`${story.score} points`}</p>
        <a
          className="info-blue link"
          href={story.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {story.domain}
        </a>
        <p className="info-gray">{story.time}</p>
      </div>
    </div>
  );
};

export default StoryCard;
