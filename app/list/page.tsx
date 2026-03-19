import { fetchPopularMovies } from "../lib/data";
import MovieList from "@/app/ui/movieList";

export default async function List() {
  const data = await fetchPopularMovies(1);

  return <MovieList initialMovieList={data} fetchMore={fetchPopularMovies} />;
}
