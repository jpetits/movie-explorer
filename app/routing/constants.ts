export const ROUTES = {
  home: "/",
  list: "/list",
  movie: (id: string) => `/movie/${id}`,
  genre: (id: string) => `/genre/${id}`,
  search: "/search",
  api: {
    popularMovies: "/api/movies/popular",
    searchMovies: (query: string) =>
      `/api/movies/search?query=${encodeURIComponent(query)}`,
    moviesByGenre: (genreId: string) => `/api/movies/genre/${genreId}`,
    movieDetails: (movieId: string) => `/api/movies/${movieId}`,
    similarMovies: (movieId: string) => `/api/movies/${movieId}/similar`,
  },
};
