"use client";

import { Movie } from "../lib/schema";
import MovieList from "./movieList";
import { Result } from "../types/types";

export default function SearchMovie({
  initialMovieList,
  initialError,
  searchQuery,
  searchMovies,
}: {
  initialMovieList: Movie[];
  initialError: string | null;
  searchQuery: string;
  searchMovies: (query: string, page: number) => Promise<Result<Movie[]>>;
}) {
  return (
    <div className="p-6">
      {searchQuery && (
        <MovieList
          initialMovieList={initialMovieList}
          error={initialError}
          fetchMore={(page) => searchMovies(searchQuery, page)}
        />
      )}
    </div>
  );
}
