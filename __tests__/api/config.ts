import { api, unsplash } from "../../api/api";

test("ensure the unsplash base url is set up", async () => {
  const response = await unsplash.get("/photos/random");
  expect(typeof response.data).toEqual("object");
  expect(response.status).toBe(200);
  expect(response.config.baseURL).toContain("api.unsplash");
});

test("ensure that default api is configured", async () => {
  const response = await api.get("jokes/random");

  expect(response.status).toBe(200);
  expect(response.config.baseURL).toContain("chucknorris");
});
