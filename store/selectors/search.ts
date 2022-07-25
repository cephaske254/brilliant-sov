import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { State } from "..";

export const selectSearchResults = createDraftSafeSelector(
  (state: State) => state.quotes,
  (a) => ({
    loading: a.loading.search,
    results: a.search.results[a.search.currentQuery] ?? [],
    query: a.search.currentQuery ?? "",
  })
);
