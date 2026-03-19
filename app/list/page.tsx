import { fetchPopularMovies } from "../lib/data";
import { ROUTES } from "../routing/constants";
import MovieList from "@/app/ui/movies/movieList";

export default async function List() {
  const data = await fetchPopularMovies(1);

  return (
    <MovieList
      initialMovieList={data}
      fetchMorePath={ROUTES.api.popularMovies}
    />
  );
}
