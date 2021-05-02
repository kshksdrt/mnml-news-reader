import React, { useReducer } from "react";
import axios from "axios";
import { formatDistance } from "date-fns";

const initialState = {
  stories: [] as Record<string, any>[],
  loading: true,
  error: false,
  errorMessage: "",
};

function reducer(state: typeof initialState, action: any) {
  switch (action.type) {
    case "making-request":
      return {
        ...state,
        stories: [],
        loading: true,
        error: false,
        errorMessage: "",
      };

    case "stories-received":
      return {
        ...state,
        stories: action.payload.stories,
        loading: false,
        error: false,
        errorMessage: "",
      };

    case "error":
      return {
        ...state,
        stories: [],
        loading: false,
        error: true,
        errorMessage: action.payload.error,
      };

    case "requesting-next-page":
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: "",
      };

    case "next-page-received":
      return {
        ...state,
        loading: false,
        stories: [...state.stories, ...action.payload.stories],
        error: false,
        errorMessage: "",
      };

    default:
      return state;
  }
}

const BASE_URL = "https://www.reddit.com/r";

type ApiReqType = "initial-load" | "load-more"
type Config = { type: ApiReqType, payload: any }

export default function useGetSubbreddit() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function api(config: Config) {
    const { type, payload } = config
    switch (type) {
      case "initial-load":
        onInitialLoad(dispatch, payload);
        break;
      case "load-more":
        onLoadMore(dispatch, payload);
        break;
      default:
        return;
    }
  }

  return [state, api] as [typeof initialState, (c: Config) => void];
}

function onInitialLoad(dispatch: React.Dispatch<{}>, payload: Record<string, any>) {
  dispatch({ type: "making-request" });
  axios({
    method: "get",
    url: `${BASE_URL}/${payload.subreddit}/hot/.json`,
    params: {
      limit: 15,
    },
  })
    .then((res) => {
      let storiesRaw, stories;
      if (res.data && res.data.data && res.data.data.children)
        storiesRaw = res.data.data.children;
      if (storiesRaw) stories = storiesCompressor(storiesRaw);
      if (stories) dispatch({ type: "stories-received", payload: { stories } });
      if (!stories)
        dispatch({ type: "error", payload: { error: "Cannot load posts" } });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: "error", payload: { error: "Cannot load posts" } });
    });
}

function onLoadMore(dispatch: React.Dispatch<{}>, payload: Record<string, any>) {
  const y = window.scrollY;
  dispatch({ type: "requesting-next-page" });
  axios({
    method: "get",
    url: `${BASE_URL}/${payload.subreddit}/hot/.json`,
    params: {
      limit: 15,
      after: payload.after,
    },
  })
    .then((res) => {
      let storiesRaw, stories;
      if (res.data && res.data.data && res.data.data.children)
        storiesRaw = res.data.data.children;
      if (storiesRaw) stories = storiesCompressor(storiesRaw);
      if (stories)
        dispatch({ type: "next-page-received", payload: { stories } });
      if (!stories)
        dispatch({ type: "error", payload: { error: "Cannot load posts" } });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: "error", payload: { error: "Cannot load posts" } });
    })
    .finally(() => window.scrollTo(0, y));
}

function storiesCompressor(stories: Record<string, any>[]) {
  return stories.map((each) => {
    const { title, score, domain, url, permalink, created, name } = each.data;
    const time = formatDistance(new Date(Date.now() - created * 1000), new Date(), { addSuffix: true });
    return { title, score, domain, url, permalink, time, name };
  });
}
