"use client";

import { Movie } from "../lib/schema";
import MovieList from "./movieList";

export default function SearchMovie({
  initialMovieList,
  searchQuery,
  searchMovies,
}: {
  initialMovieList: Movie[];
  searchQuery: string;
  searchMovies: (query: string, page: number) => Promise<Movie[]>;
}) {
  return (
    <div className="mt-6">
      {searchQuery && (
        <MovieList
          initialMovieList={initialMovieList}
          fetchMore={(page) => searchMovies(searchQuery, page)}
        />
      )}
    </div>
  );
}
