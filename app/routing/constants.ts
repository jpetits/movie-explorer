import { DiscoverFilters } from "../lib/schema";

export const ROUTES = {
  home: "/",
  list: "/list",
  movie: (id: string) => `/movie/${id}`,
  genre: (id: string) => `/genre/${id}`,
  actor: (id: string) => `/actors/${id}`,
  actorsPopular: "/actors",
  search: "/search",
  api: {
    popularMovies: "/api/movies/popular",
    searchMovies: (query: string) =>
      `/api/movies/search?query=${encodeURIComponent(query)}`,
    movieDetails: (movieId: string) => `/api/movies/${movieId}`,
    similarMovies: (movieId: string) => `/api/movies/${movieId}/similar`,
    popularActors: "/api/actors",
    discover: (filters: Partial<DiscoverFilters>) => {
      const params = new URLSearchParams();
      if (filters.page) params.append("page", String(filters.page));
      if (filters.genreId) params.append("genreId", String(filters.genreId));
      if (filters.actorId) params.append("actorId", String(filters.actorId));
      return `/api/movies/discover?${params.toString()}`;
    },
  },
};
