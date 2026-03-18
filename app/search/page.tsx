import SearchMovie from "@/app/ui/searchMovie";
import { searchMovies } from "../lib/data";
import { unwrapResult } from "../lib/utils";

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;

  const result = query ? await searchMovies(query) : null;
  const { data: initialMovies, error: initialError } = unwrapResult(result, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Movies</h1>
      <SearchMovie
        initialMovies={initialMovies}
        initialError={initialError}
        searchQuery={query}
      />
    </div>
  );
}
