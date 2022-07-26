import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { State, useDispatch } from "..";
import { reduxSearchJokes } from "../thunks/jokes";

export const selectSearchResults = createDraftSafeSelector(
  (state: State) => state.jokes,
  (a) => {
    const results = a.search.results[a.search.currentQuery] ?? [];
    return {
      loading: a.loading.search,
      results,
      query: a.search.currentQuery ?? "",
      notFound: !a.loading.search && !!a.search.currentQuery && !results.length,
      hasResults: !!a.search.currentQuery && !!results.length,
      retry: () => useDispatch()(reduxSearchJokes(a.search.currentQuery ?? "")),
    };
  }
);
