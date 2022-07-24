import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categories from "./slices/categories";
import quotes from "./slices/quotes";

const reducer = combineReducers({
  categories,
  quotes,
});

const store = configureStore({
  reducer,
});

export type State = ReturnType<typeof reducer>;
export const useDispatch = () => store.dispatch;

export default store;
