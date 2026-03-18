import { fetchPopularMovies } from "../lib/data";
import MovieList from "@/app/ui/movieList";
import { unwrapResult } from "../lib/utils";

export default async function List() {
  const { data, error } = unwrapResult(await fetchPopularMovies(1), {
    results: [],
    total_pages: 0,
  });
  const { results: movieList, total_pages: totalPages } = data;

  return (
    <MovieList
      initialMovieList={movieList}
      totalPages={totalPages}
      error={error}
    />
  );
}
