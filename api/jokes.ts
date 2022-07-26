import { api, unsplash } from "./api";

export const apiGetJoke = async ({
  category,
}: {
  category: string;
}): Promise<Joke> => {
  // run 2 parallel requests
  const [image, jokee] = (await Promise.all([
    getRandomBackgroundImage(category),
    getRandomJoke(category),
  ])) as [any, Joke];

  return {
    ...jokee,
    icon_url: image.urls.small,
  };
};

const getRandomJoke = (category: string) =>
  api.get<Joke>("jokes/random", { params: { category } }).then((a) => a.data);

const getRandomBackgroundImage = (category: string) =>
  unsplash
    .get("/photos/random", { params: { query: category } })
    .then((a) => a.data);

export type Joke = {
  categories: string[];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
};

export const apiSearchJokes = (query: string) =>
  api
    .get<{
      total: number;
      result: Joke[];
    }>("jokes/search", { params: { query } })
    .then((a) => a.data);
