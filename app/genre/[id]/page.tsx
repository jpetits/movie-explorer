import { fetchMoviesByGenre, fetchGenre } from "../../lib/data";
import BackButton from "@/app/ui/backButton";
import { notFound } from "next/navigation";
import MovieList from "@/app/ui/movieList";

export default async function Genre({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const genreId = Number(id);
  if (!genreId) {
    notFound();
  }

  const [result, genre] = await Promise.all([
    fetchMoviesByGenre(genreId, 1),
    fetchGenre(genreId),
  ]);

  const fetchMoviesByGenreWithGenreId = fetchMoviesByGenre.bind(null, genreId);

  return (
    <>
      <BackButton />
      <h1 className="text-2xl font-bold mb-4">Movies in Genre {genre.name}</h1>

      <MovieList
        initialMovieList={result}
        fetchMore={fetchMoviesByGenreWithGenreId}
      />
    </>
  );
}
