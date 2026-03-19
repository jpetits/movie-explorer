"use client";

import { useRef } from "react";
import { Movie } from "../../lib/schema";
import MovieTile from "./movieTile";
import { usePaginatedScroll } from "../../hooks/usePaginatedScroll";
import { MovieListSkeleton } from "../skeletons";

export default function MovieList({
  initialMovieList,
  fetchMorePath,
}: {
  initialMovieList: Movie[];
  fetchMorePath: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { data, isFetchingNextPage, error } = usePaginatedScroll<Movie>(
    initialMovieList,
    fetchMorePath,
    ref,
  );

  return (
    <div className="flex flex-col gap-3">
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
      {isFetchingNextPage && !error && <MovieListSkeleton />}
      {!isFetchingNextPage && data.pages[0].length === 0 && (
        <p className="mt-12 text-center text-zinc-400">No movies found.</p>
      )}
    </div>
  );
}
