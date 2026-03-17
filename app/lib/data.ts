import { Movie } from "../types/types";
import { tmdb } from "./tmdb";

export const tmdbImageUrl = "https://image.tmdb.org/t/p/w500";
export async function fetchPopularMovies(): Promise<Movie[]> {
  return await tmdb.movies
    .popular()
    .then((data) => data.results)
    .catch(() => []);
}

export async function fetchMovie(id: number): Promise<Movie | null> {
  return await tmdb.movies
    .details(id)
    .then((data) => ({
      id: data.id,
      title: data.title,
      release_date: data.release_date,
      vote_average: data.vote_average,
      poster_path: data.poster_path,
    }))
    .catch(() => null);
}

export async function searchMovies(query: string): Promise<Movie[]> {
  return await tmdb.search
    .movies({ query })
    .then((data) => data.results)
    .catch(() => []);
}
