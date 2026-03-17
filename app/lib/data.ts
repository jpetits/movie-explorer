"use server";

import { getTmdb } from "./tmdb";
import { Movie } from "../types/types";

export async function fetchPopularMovies(
  page = 1,
): Promise<{ results: Movie[]; total_pages: number }> {
  return await getTmdb()
    .movies.popular({ page })
    .then((data) => ({ results: data.results, total_pages: data.total_pages }))
    .catch(() => ({ results: [], total_pages: 0 }));
}

export async function fetchMovie(id: number): Promise<Movie | null> {
  return await getTmdb()
    .movies.details(id)
    .then((data) => ({
      id: data.id,
      title: data.title,
      release_date: data.release_date,
      vote_average: data.vote_average,
      poster_path: data.poster_path,
      overview: data.overview,
      backdrop_path: data.backdrop_path,
      genres: data.genres,
      runtime: data.runtime,
      tagline: data.tagline,
    }))
    .catch(() => null);
}

export async function searchMovies(query: string): Promise<Movie[]> {
  return await getTmdb()
    .search.movies({ query })
    .then((data) => data.results)
    .catch(() => []);
}

export async function searchMoviesByGenre(genreId: number): Promise<Movie[]> {
  return await getTmdb()
    .discover.movie({ with_genres: genreId.toString() })
    .then((data) => data.results);
}

export async function similarMovies(movieId: number): Promise<Movie[]> {
  return await getTmdb()
    .movies.similar(movieId)
    .then((data) => data.results)
    .catch(() => []);
}
