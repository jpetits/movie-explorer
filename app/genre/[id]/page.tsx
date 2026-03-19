import { fetchMoviesByGenre, fetchGenre } from "../../lib/data";
import BackButton from "@/app/ui/backButton";
import { notFound } from "next/navigation";
import MovieList from "@/app/ui/movieList";
import { ROUTES } from "@/app/routing/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const genre = await fetchGenre(Number(id));
  return {
    title: `${genre.name} Movies`,
    description: `Browse all ${genre.name} movies`,
  };
}

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

  return (
    <>
      <BackButton />
      <h1 className="text-2xl font-bold mb-4">Movies in Genre {genre.name}</h1>

      <MovieList
        initialMovieList={result}
        fetchMorePath={ROUTES.api.moviesByGenre(genreId.toString())}
      />
    </>
  );
}
