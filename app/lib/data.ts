"use server";

import { cache } from "react";
import { z } from "zod";
import { getTmdb } from "./tmdb";
import { MovieSchema, Movie, Genre, GenreSchema } from "./schema";
import { notFound } from "next/navigation";

const MovieListSchema = z.array(MovieSchema);

export async function fetchPopularMovies(page = 1): Promise<Movie[]> {
  return getTmdb()
    .movies.popular({ page })
    .then((data) => MovieListSchema.parse(data.results));
}

export async function searchMovies(query: string, page = 1): Promise<Movie[]> {
  return getTmdb()
    .search.movies({ query, page })
    .then((data) => MovieListSchema.parse(data.results));
}

export async function fetchMoviesByGenre(
  genreId: number,
  page = 1,
): Promise<Movie[]> {
  return getTmdb()
    .discover.movie({ with_genres: genreId.toString(), page })
    .then((data) => MovieListSchema.parse(data.results));
}

export const fetchMovie = cache(async (id: number): Promise<Movie> => {
  return getTmdb()
    .movies.details(id)
    .then((data) => MovieSchema.parse(data));
});

export async function fetchSimilarMovies(
  movieId: number,
  page = 1,
): Promise<Movie[]> {
  return getTmdb()
    .movies.similar(movieId, { page })
    .then((data) => MovieListSchema.parse(data.results));
}

export const fetchGenre = cache(async (id: number): Promise<Genre> => {
  return getTmdb()
    .genres.movies()
    .then((data) => {
      const genre = data.genres.find((g) => g.id === id);
      if (!genre) notFound();
      return GenreSchema.parse(genre);
    });
});
