import React, { useEffect, useState } from "react";
import Content from "./Home/Content";

import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../../types";

type Props = ConnectedProps<typeof connector>;

const Home: React.FC<Props> = (props) => {
  const { subreddits } = props;
  const [currentTab, setCurrentTab] = useState(subreddits[0]);

  useEffect(() => {
    setCurrentTab(subreddits[0]);
  }, [subreddits]);

  return (
    <div>
      <div className="tabs">
        {subreddits.map((element) => (
          <div
            className={`tab-item ${currentTab === element ? "tab-active" : ""}`}
            onClick={() => setCurrentTab(element)}
            key={element}
          >
            <span>{element}</span>
          </div>
        ))}
      </div>
      <Content subredditName={currentTab} />
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    subreddits: state.app.subreddits,
  };
};

const connector = connect(mapStateToProps);

export default connector(Home);
