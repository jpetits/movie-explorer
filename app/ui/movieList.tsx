"use client";

import { useRef } from "react";
import { Movie } from "../lib/schema";
import MovieTile from "./movieTile";
import { useInfiniteMovies } from "../hooks/useInfiniteMovies";

export default function MovieList({
  initialMovieList,
  fetchMore,
}: {
  initialMovieList: Movie[];
  fetchMore: (page: number) => Promise<Movie[]>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { data, isFetchingNextPage, error } = useInfiniteMovies(
    initialMovieList,
    fetchMore,
    ref,
  );

  return (
    <>
      {data.pages.map((page, pageIndex) => (
        <div
          key={pageIndex}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
        >
          {page.map((movie) => (
            <MovieTile key={movie.id} movie={movie} />
          ))}
        </div>
      ))}
      <div ref={ref} />
      {isFetchingNextPage && !error && <p>Loading...</p>}
      {/* {error instanceof Error && (
        <p className="text-red-500">
          {error.name}: {error.message}
        </p>
      )} */}
      {!isFetchingNextPage && data.pages[0].length === 0 && (
        <p className="mt-4">No movies found.</p>
      )}
    </>
  );
}
