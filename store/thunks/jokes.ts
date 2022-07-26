import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetJoke, apiSearchJokes, Joke } from "../../api/jokes";

export const reduxGetJoke = createAsyncThunk<Joke, any>(
  "GET_QUOTE",
  (params) => {
    return apiGetJoke(params);
  }
);

export const reduxSearchJokes = createAsyncThunk(
  "SEARCH_QUOTES",
  (arg: string) => {
    return apiSearchJokes(arg).catch(() => ({
      total: 0,
      result: [],
    }));
  }
);
