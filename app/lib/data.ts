"use server";

import { z } from "zod";
import { getTmdb } from "./tmdb";
import { Result } from "../types/types";
import { MovieSchema, Movie } from "./schema";

const MovieListSchema = z.array(MovieSchema);

export async function fetchPopularMovies(
  page = 1,
): Promise<Result<{ results: Movie[]; total_pages: number }>> {
  return await getTmdb()
    .movies.popular({ page })
    .then((data) => ({
      success: true as const,
      data: {
        results: MovieListSchema.parse(data.results),
        total_pages: data.total_pages,
      },
    }))
    .catch(() => ({
      success: false as const,
      error: "Failed to fetch popular movies",
    }));
}

export async function fetchMovie(id: number): Promise<Movie> {
  return await getTmdb()
    .movies.details(id)
    .then((data) => MovieSchema.parse(data));
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

export async function searchMoviesByGenre(genreId: number): Promise<Movie[]> {
  return await getTmdb()
    .discover.movie({ with_genres: genreId.toString() })
    .then((data) => MovieListSchema.parse(data.results));
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
