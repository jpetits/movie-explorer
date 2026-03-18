import { fetchPopularMovies } from "../lib/data";
import MovieList from "@/app/ui/movieList";
import { unwrapResult } from "../lib/utils";

export default async function List() {
  const { data, error } = unwrapResult(await fetchPopularMovies(1), []);

  return (
    <MovieList
      initialMovieList={data}
      error={error}
      fetchMore={fetchPopularMovies}
    />
  );
}
