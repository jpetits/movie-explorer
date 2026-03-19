"use client";

import { useRef } from "react";
import { Movie } from "../lib/schema";
import MovieTile from "./movieTile";
import { useInfiniteMovies } from "../hooks/useInfiniteMovies";

export default function MovieList({
  initialMovieList,
  fetchMorePath,
}: {
  initialMovieList: Movie[];
  fetchMorePath: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { data, isFetchingNextPage, error } = useInfiniteMovies(
    initialMovieList,
    fetchMorePath,
    ref,
  );

  return (
    <>
      {data.pages.map((page, pageIndex) => (
        <div
          key={pageIndex}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
        >
          {page.map((movie: Movie) => (
            <MovieTile key={movie.id} movie={movie} />
          ))}
        </div>
      ))}
      <div ref={ref} />
      {isFetchingNextPage && !error && <p>Loading...</p>}
      {!isFetchingNextPage && data.pages[0].length === 0 && (
        <p className="mt-4">No movies found.</p>
      )}
    </>
  );
}
