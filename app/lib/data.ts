"use server";

import { getTmdb } from "./tmdb";
import { Movie } from "../types/types";

export async function fetchPopularMovies(): Promise<Movie[]> {
  return await getTmdb()
    .movies.popular()
    .then((data) => data.results)
    .catch(() => []);
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
    }))
    .catch(() => null);
}

export async function searchMovies(query: string): Promise<Movie[]> {
  return await getTmdb()
    .search.movies({ query })
    .then((data) => data.results)
    .catch(() => []);
}
