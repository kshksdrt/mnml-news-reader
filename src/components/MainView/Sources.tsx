import React, { useRef, useContext, useState } from "react";

import { ReactComponent as Add } from "../../assets/icons/add.svg";
import { ReactComponent as Remove } from "../../assets/icons/remove.svg";

import axios from "axios";
import { addSubreddit, deleteSubreddit } from "../../redux/actionCreator";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../../types";

type Props = ConnectedProps<typeof connector>;

const Sources: React.FC<Props> = (props) => {
  const { subreddits, $addSubreddit, $deleteSubreddit } = props;

  const [addError, setAddError] = useState(false);
  const [loader, setLoader] = useState(false);

  const [input, setInput] = useState("");

  function addSubreddit() {
    setLoader(true);
    if (input.length === 0) showAddError();
    axios
      .get(`https://www.reddit.com/r/${input}/top/.json`)
      .then(() => {
        $addSubreddit(input);
        setLoader(false);
      })
      .catch(() => {
        showAddError();
        setLoader(false);
      });
    setInput("");
  }

  async function showAddError() {
    setAddError(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setAddError(false);
  }

  return (
    <div className="mx-4">
      <h3>Add a subreddit</h3>
      <br></br>
      <div className="input-accept">
        <input
          className="input"
          placeholder="Subreddit name"
          value={input}
          type="text"
        ></input>
        <Add onClick={() => addSubreddit()} className="icon-button" />
      </div>
      {subreddits.map((subreddit) => {
        return (
          <div id="add-subreddits-listitem" key={subreddit}>
            <p key={subreddit}>{subreddit}</p>
            <Remove
              className="icon-button"
              onClick={() => $deleteSubreddit(subreddit)}
            />
          </div>
        );
      })}
      {addError && (
        <div
          id="add-subreddits-listitem"
          style={{ background: "var(--danger)" }}
        >
          <p>Error adding subreddit</p>
        </div>
      )}
      {loader && (
        <div id="add-subreddits-listitem" style={{ background: "var(--bg-1)" }}>
          <div className="loader my-3"></div>
          <div></div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    subreddits: state.subreddits,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    $addSubreddit: (s: string) => dispatch(addSubreddit(s)),
    $deleteSubreddit: (s: string) => dispatch(deleteSubreddit(s)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Sources);
