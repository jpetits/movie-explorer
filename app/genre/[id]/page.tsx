import { fetchMoviesByGenre, fetchGenre } from "../../lib/data";
import BackButton from "@/app/ui/dashboard/backButton";
import { notFound } from "next/navigation";
import MovieList from "@/app/ui/movies/movieList";
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-zinc-100">{genre.name}</h1>
      </div>
      <MovieList
        initialMovieList={result}
        fetchMorePath={ROUTES.api.moviesByGenre(genreId.toString())}
      />
    </>
  );
}
