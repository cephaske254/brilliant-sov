import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { State } from "..";

const selectCategoriesState = (state: State) => state.categories;

export const selectCategories = createDraftSafeSelector(
  selectCategoriesState,
  (a) => ({
    loading: a.loading,
    errored: a.errored.initialization,
    categories: a.categories,
  })
);