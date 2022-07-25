import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { State } from "..";
import { MainRoutes } from "../../router";

const selectQuotesState = (state: State) => state.quotes;

export const selectQuoteByCategoryOrSearchQuery = ({
  category,
  id,
  query,
}: MainRoutes["Quote"]) =>
  createDraftSafeSelector(selectQuotesState, (state) => {
    // check if is search query selection
    // if it has id and query

    if (id && query) {
      return {
        loading: state.loading.search,
        quote: state.search.results[query]?.find((a) => a.id === id) ?? null,
      };
    }

    return {
      loading: state.loading.global,
      quote: (!!category ? state.quotes[category] : undefined) ?? null,
    };
  });
