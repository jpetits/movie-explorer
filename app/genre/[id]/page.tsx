import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/app/routing/constants";
import { searchMoviesByGenre, fetchGenre } from "../../lib/data";
import { tmdbImageUrl } from "../../lib/tmdb";
import BackButton from "@/app/ui/backButton";
import { formatDate, unwrapResult } from "@/app/lib/utils";
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
    unwrapResult(await searchMoviesByGenre(genreId, 1), []),
    fetchGenre(genreId),
  ]);

  async function fetchMore(page: number) {
    "use server";
    return searchMoviesByGenre(genreId, page);
  }

  return (
    <>
      <BackButton />
      <h1 className="text-2xl font-bold mb-4">Movies in Genre {genre.name}</h1>

      <MovieList
        initialMovieList={result.data}
        fetchMore={fetchMore}
        error={result.error}
      />
    </>
  );
}
