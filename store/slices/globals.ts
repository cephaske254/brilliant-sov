import { createSlice } from "@reduxjs/toolkit";
import { reduxGetCategories } from "../thunks/globals";

const initialState: InitialState = {
  categories: [],
  loading: false,
  errored: {
    initialization: false,
    search: false,
  },
};

const globals = createSlice({
  name: "globals",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // set categories on success response
    builder
      .addCase(reduxGetCategories.fulfilled, (state, { payload }) => {
        state.categories = payload;
      })
      // set loading start
      .addMatcher(
        ({ type }) => [reduxGetCategories.pending].includes(type),
        (state) => {
          state.loading = true;
        }
      )

      //set loading end
      .addMatcher(
        ({ type }) => [reduxGetCategories.pending].includes(type),
        (state) => {
          state.loading = false;
        }
      );
  },
});

type InitialState = {
  loading: boolean;
  categories: string[];
  errored: {
    search: boolean;
    initialization: boolean;
  };
};
export default globals.reducer;
