import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { State } from "..";
import { MainRoutes } from "../../router";

const selectJokesState = (state: State) => state.jokes;

export const selectJokeByCategoryOrSearchQuery = ({
  category,
  id,
  query,
}: MainRoutes["Joke"]) =>
  createDraftSafeSelector(selectJokesState, (state) => {
    // check if is search query selection
    // if it has id and query

    if (id && query) {
      return {
        loading: state.loading.search,
        joke: state.search.results[query]?.find((a) => a.id === id) ?? null,
      };
    }

    return {
      loading: state.loading.global,
      joke: (!!category ? state.jokes[category] : undefined) ?? null,
    };
  });
