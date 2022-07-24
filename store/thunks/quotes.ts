import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetQuote, Quote } from "../../api/quotes";

export const reduxGetQuote = createAsyncThunk<Quote, { category: string }>(
  "GET_QUOTE",
  (params) => {
    return apiGetQuote(params);
  }
);
