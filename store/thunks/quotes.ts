import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetQuote, apiSearchQuotes, Quote } from "../../api/quotes";

export const reduxGetQuote = createAsyncThunk<Quote, any>(
  "GET_QUOTE",
  (params) => {
    return apiGetQuote(params);
  }
);

export const reduxSearchQuotes = createAsyncThunk(
  "SEARCH_QUOTES",
  (arg: string) => {
    return apiSearchQuotes(arg);
  }
);
