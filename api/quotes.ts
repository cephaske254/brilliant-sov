import { api, unsplash } from "./api";

export const apiGetQuote = async ({
  category,
}: {
  category: string;
}): Promise<Quote> => {
  // run 2 parallel requests
  const [image, quote] = (await Promise.all([
    getRandomBackgroundImage(category),
    getRandomQuote(category),
  ])) as [any, Quote];

  return {
    ...quote,
    icon_url: image.urls.small,
  };
};

const getRandomQuote = (category: string) =>
  api.get<Quote>("jokes/random", { params: { category } }).then((a) => a.data);

const getRandomBackgroundImage = (category: string) =>
  unsplash
    .get("/photos/random", { params: { query: category } })
    .then((a) => a.data);

export type Quote = {
  categories: string[];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
};

export const apiSearchQuotes = (query: string) =>
  api
    .get<{
      total: number;
      result: Quote[];
    }>("jokes/search", { params: { query } })
    .then((a) => a.data);
