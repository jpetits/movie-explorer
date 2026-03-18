import { fetchPopularMovies } from "../lib/data";
import MovieList from "@/app/ui/movieList";

export default async function List() {
  const { results: movieList, total_pages: totalPages } =
    await fetchPopularMovies(1);

  return <MovieList initialMovieList={movieList} totalPages={totalPages} />;
}
