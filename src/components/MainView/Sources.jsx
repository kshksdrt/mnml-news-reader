import React, { useRef, useContext, useState } from "react";
import { ReactComponent as Add } from "../../assets/icons/add.svg";
import { ReactComponent as Remove } from "../../assets/icons/remove.svg";

import { GlobalContext } from "../../state/Store";
import axios from "axios";

export default function Sources() {
  const [state, dispatch] = useContext(GlobalContext);

  const [addError, setAddError] = useState(false);
  const [loader, setLoader] = useState(false);

  const addSubredditInput = useRef();

  function addSubreddit() {
    setLoader(true);
    const subredditName = addSubredditInput.current.value;
    if (subredditName.length === 0) showAddError();
    axios
      .get(`https://www.reddit.com/r/${subredditName}/top/.json`)
      .then((_) => {
        dispatch({ type: "ADD_SUBREDDIT", payload: subredditName });
        setLoader(false);
      })
      .catch((_) => {
        showAddError();
        setLoader(false);
      });
    addSubredditInput.current.value = "";
  }

  function removeSubreddit(subredditName) {
    dispatch({
      type: "DELETE_SUBREDDIT",
      payload: subredditName,
    });
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
          ref={addSubredditInput}
          type="text"
        ></input>
        <Add onClick={(_) => addSubreddit()} className="icon-button" />
      </div>
      {state.subreddits.map((element) => {
        return (
          <div id="add-subreddits-listitem" key={element}>
            <p key={element}>{element}</p>
            <Remove
              className="icon-button"
              onClick={(_) => removeSubreddit(element)}
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
}
