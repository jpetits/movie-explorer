"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ROUTES } from "../routing/constants";
import { tmdbImageUrl } from "../lib/tmdb";
import { Movie } from "../lib/schema";
import { fetchPopularMovies } from "../lib/data";
import { deduplicateIds, formatDate, unwrapResult } from "@/app/lib/utils";

export default function MovieList({
  initialMovieList,
  totalPages,
  error: initialError,
}: {
  initialMovieList: Movie[];
  totalPages: number;
  error?: string | null;
}) {
  const [movieList, setMovieList] = useState(initialMovieList);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError ?? null);
  const [page, setPage] = useState(1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && page < totalPages) {
          observer.disconnect();
          setLoading(true);
          fetchPopularMovies(page + 1).then((result) => {
            const { data, error } = unwrapResult(result, {
              results: [],
              total_pages: 0,
            });
            if (!error) {
              setMovieList((prev) => deduplicateIds(prev, data.results));
              setPage((p) => p + 1);
            } else {
              setError(error);
            }
            setLoading(false);
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
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
