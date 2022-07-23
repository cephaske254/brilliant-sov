import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globals from "./slices/globals";

const reducer = combineReducers({
  globals
});

const store = configureStore({
  reducer,
});

export type State = typeof reducer;
export const useDispatch = store.dispatch;

export default store;
