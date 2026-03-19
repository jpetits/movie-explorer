import SearchMovie from "@/app/ui/movies/searchMovie";
import { searchMovies } from "../lib/data";
import SearchInput from "@/app/ui/movies/search";
import { Suspense } from "react";
import { SearchSkeleton } from "../ui/skeletons";
import { ROUTES } from "../routing/constants";

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;

  const queryString = query ?? "";
  const data = await searchMovies(queryString, 1);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Movies</h1>
      <SearchInput />
      <Suspense key={query} fallback={<SearchSkeleton />}>
        <SearchMovie
          initialMovieList={data}
          searchQuery={queryString}
          fetchMorePath={ROUTES.api.searchMovies(queryString)}
        />
      </Suspense>
    </div>
  );
}
