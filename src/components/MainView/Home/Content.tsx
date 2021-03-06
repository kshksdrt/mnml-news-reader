import React, { useEffect } from "react";

import StoryCard from "./StoryCard";
import useGetSubbreddit from "../../../hooks/useGetSubreddit";
import { ReactComponent as Error } from "../../../assets/icons/error.svg";

interface Props {
  subredditName: string;
}

const Content: React.FC<Props> = ({ subredditName }) => {
  const [state, api] = useGetSubbreddit();

  useEffect(() => {
    api({
      type: "initial-load",
      payload: { subreddit: subredditName },
    });
  }, [subredditName]);

  function loadMore() {
    const after = state.stories[state.stories.length - 1].name;
    api({ type: "load-more", payload: { subreddit: subredditName, after } });
  }

  return (
    <div id="content">
      {state.stories.map((story: Record<string, any>) => {
        return <StoryCard key={story.name} story={story} />;
      })}
      {state.loading && <div className="loader"></div>}
      {state.error && (
        <div className="flex-row">
          <Error className="mx-2" />
          <p className="text-small mx-2">Error loading posts</p>
        </div>
      )}
      {state.stories.length > 0 && (
        <div className="flex-row">
          <button className="button my-2" onClick={loadMore}>
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default Content;
