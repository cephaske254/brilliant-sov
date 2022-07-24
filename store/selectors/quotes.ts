import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { State } from "..";

const selectQuotesState = (state: State) => state.quotes;

export const selectQuoteByCategory = ({ category }: { category: string }) =>
  createDraftSafeSelector(selectQuotesState, (a) => ({
    loading: a.loading.global,
    quote: a.quotes[category] ?? null,
  }));
