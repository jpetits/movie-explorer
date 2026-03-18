import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/app/routing/constants";
import { searchMoviesByGenre } from "../../lib/data";
import { tmdbImageUrl } from "../../lib/tmdb";
import BackButton from "@/app/ui/backButton";
import { formatDate } from "@/app/lib/utils";
import { notFound } from "next/navigation";

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

  const result = await searchMoviesByGenre(genreId);

  return (
    <>
      <BackButton />
      {result.map((movie) => (
        <Link key={movie.id} href={ROUTES.detail(movie.id.toString())}>
          <h2>{movie.title}</h2>
          <p>Release Date: {formatDate(movie.release_date)}</p>
          <p>Rating: {movie.vote_average}</p>
          {movie.poster_path && (
            <Image
              src={`${tmdbImageUrl}${movie.poster_path}`}
              alt={movie.title}
              width={500}
              height={750}
            />
          )}
        </Link>
      ))}
    </>
  );
}
