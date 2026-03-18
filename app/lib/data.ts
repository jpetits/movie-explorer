"use server";

import { z } from "zod";
import { getTmdb } from "./tmdb";
import { Result } from "../types/types";
import { MovieSchema, Movie, Genre, GenreSchema } from "./schema";
import { withResult } from "./utils";

const MovieListSchema = z.array(MovieSchema);

export async function fetchPopularMovies(page = 1): Promise<Result<Movie[]>> {
  return withResult(
    getTmdb()
      .movies.popular({ page })
      .then((data) => MovieListSchema.parse(data.results)),
    "Failed to fetch popular movies",
  );
}

export async function searchMovies(
  query: string,
  page = 1,
): Promise<Result<Movie[]>> {
  return withResult(
    getTmdb()
      .search.movies({ query, page })
      .then((data) => MovieListSchema.parse(data.results)),
    "Search failed",
  );
}

export async function searchMoviesByGenre(
  genreId: number,
  page = 1,
): Promise<Result<Movie[]>> {
  return withResult(
    getTmdb()
      .discover.movie({ with_genres: genreId.toString(), page })
      .then((data) => MovieListSchema.parse(data.results)),
    "Failed to fetch movies by genre",
  );
}

export async function fetchMovie(id: number): Promise<Movie> {
  return getTmdb()
    .movies.details(id)
    .then((data) => MovieSchema.parse(data));
}

export async function similarMovies(
  movieId: number,
  page = 1,
): Promise<Result<Movie[]>> {
  return withResult(
    getTmdb()
      .movies.similar(movieId, { page })
      .then((data) => MovieListSchema.parse(data.results)),
    "Failed to fetch similar movies",
  );
}

export async function fetchGenre(id: number): Promise<Genre> {
  return getTmdb()
    .genres.movies()
    .then((data) => {
      const genre = data.genres.find((g) => g.id === id);
      if (!genre) {
        throw new Error("Genre not found");
      }
      return GenreSchema.parse(genre);
    });
}
