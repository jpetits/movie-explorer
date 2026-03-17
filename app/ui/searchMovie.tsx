"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { searchMovies } from "../lib/data";
import { Movie } from "../types/types";

export default function SearchMovie() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [movieList, setMovieList] = useState<Movie[]>([]);

  const handleSearch = useDebouncedCallback(async (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }

    setMovieList(await searchMovies(value));

    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="p-6">
      <input
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query") || ""}
        className="border p-2 w-full"
        placeholder="Search for a movie..."
      />
      {movieList.length > 0 && (
        <ul className="mt-4">
          {movieList.map((movie) => (
            <li key={movie.id} className="border-b py-2">
              {movie.title} ({movie.release_date})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
