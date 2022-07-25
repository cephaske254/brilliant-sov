import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "https://api.chucknorris.io/",
});

const unsplash = axios.create({
  baseURL: "https://api.unsplash.com/",
});

unsplash.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = {
    ...config.headers,
    Authorization: `Client-ID _7k4JP7jmx0tljALukke2rCy_wi51ph4R4fi9mYn7lM`,
  };
  return config;
});

export { unsplash, api };
