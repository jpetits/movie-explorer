"use server";

import { cache } from "react";
import { getTmdb } from "./tmdb";
import {
  MovieSchema,
  Movie,
  Genre,
  GenreSchema,
  ActorListSchema,
  MovieListSchema,
  Actor,
  ActorSchema,
} from "./schema";
import { notFound } from "next/navigation";
import { DiscoverFilters } from "./schema";

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

export async function fetchPopularActors(page = 1): Promise<Actor[]> {
  return getTmdb()
    .people.popular({ page })
    .then((data) => ActorListSchema.parse(data.results));
}

export const fetchActor = cache(async (id: number): Promise<Actor> => {
  return getTmdb()
    .people.details(id)
    .then((data) => ActorSchema.parse(data));
});

export async function fetchDiscoverMovies({
  ...filters
}: DiscoverFilters): Promise<Movie[]> {
  return getTmdb()
    .discover.movie({
      with_genres: filters.genreId ? String(filters.genreId) : undefined,
      with_cast: filters.actorId ? String(filters.actorId) : undefined,
      page: filters.page,
    })
    .then((data) => MovieListSchema.parse(data.results));
}

export async function fetchActorsByMovie(movieId: number): Promise<Actor[]> {
  return getTmdb()
    .movies.credits(movieId)
    .then((data) => ActorListSchema.parse(data.cast));
}
