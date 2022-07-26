import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categories from "./slices/categories";
import jokes from "./slices/jokes";

const reducer = combineReducers({
  categories,
  jokes,
});

const store = configureStore({
  reducer,
});

export type State = ReturnType<typeof reducer>;
export const useDispatch = () => store.dispatch;

export default store;
