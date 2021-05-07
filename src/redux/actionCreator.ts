import { createAction } from "@reduxjs/toolkit";
import { Theme, View } from "../types";

// App reducer
export const setTheme = createAction<Theme>('app/setTheme')
export const setView = createAction<View>('app/setView')
export const addSubreddit = createAction<string>('app/addSubreddit')
export const deleteSubreddit = createAction<string>('app/deleteSubreddit')
export const importSubreddits = createAction<string[]>('app/importSubreddits')
