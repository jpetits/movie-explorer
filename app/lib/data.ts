"use server";

import { z } from "zod";
import { getTmdb } from "./tmdb";
import { Result } from "../types/types";
import { MovieSchema, Movie } from "./schema";

const MovieListSchema = z.array(MovieSchema);

export async function fetchPopularMovies(
  page = 1,
): Promise<{ results: Movie[]; total_pages: number }> {
  return await getTmdb()
    .movies.popular({ page })
    .then((data) => ({ results: MovieListSchema.parse(data.results), total_pages: data.total_pages }))
    .catch(() => ({ results: [], total_pages: 0 }));
}

export async function fetchMovie(id: number): Promise<Result<Movie>> {
  return await getTmdb()
    .movies.details(id)
    .then((data) => ({
      success: true as const,
      data: MovieSchema.parse(data),
    }))
    .catch(() => ({ success: false as const, error: "Failed to fetch movie" }));
}

export async function searchMovies(query: string): Promise<Result<Movie[]>> {
  return await getTmdb()
    .search.movies({ query })
    .then((data) => ({
      success: true as const,
      data: MovieListSchema.parse(data.results),
    }))
    .catch(() => ({ success: false as const, error: "Search failed" }));
}

export async function searchMoviesByGenre(
  genreId: number,
): Promise<Result<Movie[]>> {
  return await getTmdb()
    .discover.movie({ with_genres: genreId.toString() })
    .then((data) => ({
      success: true as const,
      data: MovieListSchema.parse(data.results),
    }))
    .catch(() => ({ success: false as const, error: "Search failed" }));
}

export async function similarMovies(movieId: number): Promise<Result<Movie[]>> {
  return await getTmdb()
    .movies.similar(movieId)
    .then((data) => ({
      success: true as const,
      data: MovieListSchema.parse(data.results),
    }))
    .catch(() => ({
      success: false as const,
      error: "Failed to fetch similar movies",
    }));
}
