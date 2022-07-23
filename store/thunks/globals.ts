import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const reduxGetCategories = createAsyncThunk("GET_CATEGORIES", () => {
  return api.get<string[]>("/jokes/categories").then((a) => a.data);
});
