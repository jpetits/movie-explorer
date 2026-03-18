"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId, useState, useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";
import { searchMovies } from "../lib/data";
import { Movie } from "../types/types";
import Link from "next/link";
import { ROUTES } from "../routing/constants";

export default function SearchMovie() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const inputId = useId();

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);

    startTransition(async () => {
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
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query") ?? ""}
        className="border p-2 w-full"
        placeholder="Search for a movie..."
      />
      {!isPending && movieList.length > 0 && (
        <ul className="mt-4">
          {movieList.map((movie) => (
            <li key={movie.id} className="border-b py-2">
              <Link href={ROUTES.detail(movie.id.toString())}>
                {movie.title} ({new Date(movie.release_date).getFullYear()})
              </Link>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {isPending && <p className="mt-4">Searching...</p>}
    </div>
  );
}
