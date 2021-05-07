import { combineReducers } from "@reduxjs/toolkit";

import appReducer from "./appReducer";

const reducer = combineReducers({
  app: appReducer,
});

export default reducer
