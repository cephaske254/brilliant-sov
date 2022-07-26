import { createSlice } from "@reduxjs/toolkit";
import { Joke } from "../../api/jokes";
import { reduxGetJoke, reduxSearchJokes } from "../thunks/jokes";

type InitialState = {
  loading: { global: boolean; search: boolean };
  jokes: Record<string, Joke>;
  search: {
    currentQuery: string;
    results: Record<string, Joke[]>;
  };
};
const initialState: InitialState = {
  loading: {
    global: false,
    search: false,
  },
  jokes: {},
  search: {
    currentQuery: "",
    results: {},
  },
};

const jokes = createSlice({
  name: "jokes",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // when a joke is fetched successfully
    builder
      .addCase(reduxGetJoke.fulfilled, (state, { payload, meta: { arg } }) => {
        // set a joke for a specific category
        state.jokes[arg.category] = payload;
        state.loading.global = false;
        return state;
      })

      // search jokes
      .addCase(reduxSearchJokes.fulfilled, (state, { payload, meta }) => {
        const query = meta.arg.trim();

        state.search.results[query] = payload.result;
        state.loading.search = false;
        state.search.currentQuery = query;

        return state;
      })

      // set global loading
      .addCase(reduxGetJoke.pending, (state) => {
        state.loading.global = true;
      })
      // set global loading false
      .addCase(reduxGetJoke.rejected, (state) => {
        state.loading.global = false;
      })

      // set search loading true
      .addCase(reduxSearchJokes.pending, (state) => {
        state.loading.search = true;
      })
      // set search loading false
      .addCase(reduxSearchJokes.rejected, (state) => {
        state.loading.search = false;
      });
  },
});

export default jokes.reducer;
