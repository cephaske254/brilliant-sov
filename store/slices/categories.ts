import { createSlice } from "@reduxjs/toolkit";
import { reduxGetCategories } from "../thunks/categories";

const initialState: InitialState = {
  categories: [],
  loading: false,
  errored: {
    initialization: false,
  },
};

const globals = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // set categories on success response
    builder
      .addCase(reduxGetCategories.fulfilled, (state, { payload }) => {
        state.categories = payload;
        return state;
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
    initialization: boolean;
  };
};
export default globals.reducer;
