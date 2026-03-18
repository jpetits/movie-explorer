"use client";

import { useRef, useState } from "react";
import { Movie } from "../lib/schema";
import MovieTile from "./movieTile";
import { Result } from "../types/types";
import { useInfiniteMovies } from "../hooks/useInfiniteMovies";

export default function MovieList({
  initialMovieList,
  error: initialError,
  fetchMore,
}: {
  initialMovieList: Movie[];
  error?: string | null;
  fetchMore: (page: number) => Promise<Result<Movie[]>>;
}) {
  const [error, setError] = useState<string | null>(initialError ?? null);
  const ref = useRef<HTMLDivElement>(null);

  const { data, isFetchingNextPage } = useInfiniteMovies(
    initialMovieList,
    fetchMore,
    ref,
  );

  return (
    <>
      {data.pages.map((page, pageIndex) => (
        <span key={pageIndex}>
          {page.map((movie) => (
            <MovieTile key={movie.id} movie={movie} />
          ))}
        </span>
      ))}
      <div ref={ref} />
      {isFetchingNextPage && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!isFetchingNextPage && data.pages[0].length === 0 && (
        <p className="mt-4">No movies found.</p>
      )}
    </>
  );
}
