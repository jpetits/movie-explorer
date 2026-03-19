export const ROUTES = {
  home: "/",
  list: "/list",
  movie: (id: string) => `/movie/${id}`,
  genre: (id: string) => `/genre/${id}`,
  search: "/search",
};
