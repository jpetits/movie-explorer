"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ROUTES } from "../routing/constants";
import { tmdbImageUrl } from "../lib/tmdb";
import { Movie } from "../lib/schema";
import { fetchPopularMovies } from "../lib/data";
import { deduplicateMovies, formatDate } from "@/app/lib/utils";

export default function MovieList({
  initialMovieList,
  totalPages,
}: {
  initialMovieList: Movie[];
  totalPages: number;
}) {
  const [movieList, setMovieList] = useState(initialMovieList);
  const [page, setPage] = useState(1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && page < totalPages) {
          fetchPopularMovies(page + 1).then(({ results, total_pages }) => {
            setMovieList((prev) => deduplicateMovies(prev, results));
            setPage((p) => p + 1);
          });
        }
      },
      { rootMargin: "200px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [page, totalPages]);

  return (
    <>
      {movieList.map((movie) => (
        <Link key={movie.id} href={ROUTES.detail(movie.id.toString())}>
          <h2>{movie.title}</h2>
          <p>Release Date: {formatDate(movie.release_date)}</p>
          <p>Rating: {movie.vote_average}</p>
          {movie.poster_path && (
            <Image
              src={`${tmdbImageUrl}${movie.poster_path}`}
              alt={movie.title}
              width={500}
              height={750}
            />
          )}
        </Link>
      ))}
      <div ref={ref} />
    </>
  );
}
