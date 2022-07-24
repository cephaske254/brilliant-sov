import { api } from "./api";

export const apiGetCategories = () =>
  api.get<string[]>("/jokes/categories").then((a) => a.data);
