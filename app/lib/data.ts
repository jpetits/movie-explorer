"use server";

import { getTmdb } from "./tmdb";
import { Movie, Result } from "../types/types";

export async function fetchPopularMovies(
  page = 1,
): Promise<{ results: Movie[]; total_pages: number }> {
  return await getTmdb()
    .movies.popular({ page })
    .then((data) => ({ results: data.results, total_pages: data.total_pages }))
    .catch(() => ({ results: [], total_pages: 0 }));
}

export async function fetchMovie(id: number): Promise<Result<Movie>> {
  return await getTmdb()
    .movies.details(id)
    .then((data) => ({
      success: true as const,
      data: {
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
      },
    }))
    .catch(() => ({ success: false as const, error: "Failed to fetch movie" }));
}

export async function searchMovies(query: string): Promise<Result<Movie[]>> {
  return await getTmdb()
    .search.movies({ query })
    .then((data) => ({ success: true as const, data: data.results }))
    .catch(() => ({ success: false as const, error: "Search failed" }));
}

export async function searchMoviesByGenre(
  genreId: number,
): Promise<Result<Movie[]>> {
  return await getTmdb()
    .discover.movie({ with_genres: genreId.toString() })
    .then((data) => ({ success: true as const, data: data.results }))
    .catch(() => ({ success: false as const, error: "Search failed" }));
}

export async function similarMovies(movieId: number): Promise<Result<Movie[]>> {
  return await getTmdb()
    .movies.similar(movieId)
    .then((data) => ({ success: true as const, data: data.results }))
    .catch(() => ({ success: false as const, error: "Search failed" }));
}
