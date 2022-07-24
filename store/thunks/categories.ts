import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetCategories } from "../../api/categories";

export const reduxGetCategories = createAsyncThunk("GET_CATEGORIES", () => {
  return apiGetCategories();
});
