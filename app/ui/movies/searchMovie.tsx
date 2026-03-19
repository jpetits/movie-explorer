"use client";

import { Movie } from "../../lib/schema";
import MovieList from "./movieList";

export default function SearchMovie({
  initialMovieList,
  searchQuery,
  fetchMorePath,
}: {
  initialMovieList: Movie[];
  searchQuery: string;
  fetchMorePath: string;
}) {
  return (
    <div className="mt-6">
      {searchQuery && (
        <MovieList
          initialMovieList={initialMovieList}
          fetchMorePath={fetchMorePath}
        />
      )}
    </div>
  );
}
