import { createSlice } from "@reduxjs/toolkit";
import { Quote } from "../../api/quotes";
import { reduxGetQuote, reduxSearchQuotes } from "../thunks/quotes";

type InitialState = {
  loading: { global: boolean; search: boolean };
  quotes: Record<string, Quote>;
  search: {
    currentQuery: string;
    results: Record<string, Quote[]>;
  };
};
const initialState: InitialState = {
  loading: {
    global: false,
    search: false,
  },
  quotes: {},
  search: {
    currentQuery: "",
    results: {},
  },
};

const quotes = createSlice({
  name: "quotes",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // when a quote is fetched successfully
    builder
      .addCase(reduxGetQuote.fulfilled, (state, { payload, meta: { arg } }) => {
        // set a quote for a specific category
        state.quotes[arg.category] = payload;
        state.loading.global = false;
        return state;
      })

      // search quotes
      .addCase(reduxSearchQuotes.fulfilled, (state, { payload, meta }) => {
        const query = meta.arg.trim();

        state.search.results[query] = payload.result;
        state.loading.search = false;
        state.search.currentQuery = query;

        return state;
      })

      // set global loading
      .addCase(reduxGetQuote.pending, (state) => {
        state.loading.global = true;
      })
      // set global loading false
      .addCase(reduxGetQuote.rejected, (state) => {
        state.loading.global = false;
      })

      // set search loading true
      .addCase(reduxSearchQuotes.pending, (state) => {
        state.loading.search = true;
      })
      // set search loading false
      .addCase(reduxSearchQuotes.rejected, (state) => {
        state.loading.search = false;
      });
  },
});

export default quotes.reducer;
