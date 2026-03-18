import SearchMovie from "@/app/ui/searchMovie";
import { searchMovies } from "../lib/data";

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  const initialMovies = query
    ? await searchMovies(query).then((result) =>
        result.success ? result.data : [],
      )
    : [];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Movies</h1>
      <SearchMovie movieList={initialMovies} />
    </div>
  );
}
