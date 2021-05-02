export default function (state, action) {
  const { type, payload } = action;

  switch (type) {
    case "SET_THEME": {
      if (!["dark", "light"].includes(payload)) return state;
      return {
        ...state,
        theme: payload,
      };
    }

    case "ADD_SUBREDDIT": {
      if (typeof payload !== "string") return state;
      if (state.subreddits.includes(payload)) return state;
      const subreddits = [...state.subreddits, payload];
      return {
        ...state,
        subreddits,
      };
    }

    case "DELETE_SUBREDDIT": {
      if (typeof payload !== "string") return state;
      const subreddits = state.subreddits.filter((element) => {
        return element !== payload;
      });
      return {
        ...state,
        subreddits,
      };
    }

    case "IMPORT_SUBREDDITS_LIST": {
      state.subreddits = payload;
      return state;
    }

    default: {
      return state;
    }
  }
}
