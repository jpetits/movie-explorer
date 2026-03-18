"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useState, useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";
import { searchMovies } from "../lib/data";
import { Movie } from "../lib/schema";
import Link from "next/link";
import { ROUTES } from "../routing/constants";
import { cn } from "../lib/utils";

export default function SearchMovie({
  movieList: initialMovieList,
}: {
  movieList: Movie[];
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [movieList, setMovieList] = useState<Movie[]>(initialMovieList);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const inputId = useId();

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
      setError(null);
    }
    replace(`${pathname}?${params.toString()}`);

    startTransition(async () => {
      if (!value.trim()) {
        setMovieList([]);
        return;
      }
      const result = await searchMovies(value);
      if (result.success) {
        setMovieList(result.data);
        setError(null);
      } else {
        setError(result.error);
        setMovieList([]);
      }
    });
  }, 500);

  return (
    <div className="p-6">
      <label htmlFor={inputId} className="block mb-1 text-sm font-medium">
        Search movies
      </label>
      <input
        id={inputId}
        aria-busy={isPending}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query") ?? ""}
        className="border p-2 w-full"
        placeholder="Search for a movie..."
      />
      {movieList.length > 0 && (
        <ul
          className={cn(
            "mt-4",
            "space-y-2",
            isPending && "pointer-events-none opacity-50",
          )}
        >
          {movieList.map((movie) => (
            <li key={movie.id} className="border-b py-2">
              <Link href={ROUTES.detail(movie.id.toString())}>
                {movie.title} (
                {movie.release_date
                  ? new Date(movie.release_date).getFullYear()
                  : "N/A"}
                )
              </Link>
            </li>
          ))}
        </ul>
      )}
      {!isPending && movieList.length === 0 && (
        <p className="mt-4">No movies found.</p>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {isPending && <p className="mt-4">Searching...</p>}
    </div>
  );
}
