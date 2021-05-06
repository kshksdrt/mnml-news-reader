import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../../types";

const initialState = {
  view: "home",
  theme: "dark",
  subreddits: ["technology", "worldnews"],
} as AppState["app"];

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setView(state, action) {
      state.view = action.payload
    },
    setTheme(state, action) {
      state.theme = action.payload
    },
    addSubreddit(state, action) {
      if (state.subreddits.includes(action.payload)) return;
      state.subreddits.push(action.payload)
    },
    deleteSubreddit(state, action) {
      state.subreddits = state.subreddits.filter(s => s !== action.payload);
    },
    importSubreddits(state, action) {
      if (action.payload.some((s: string) => typeof s !== "string")) return;
      state.subreddits = action.payload
    }
  },
})

const appReducer = appSlice.reducer

export default appReducer
