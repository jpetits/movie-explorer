import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/app/routing/constants";
import { searchMoviesByGenre } from "../../lib/data";
import { tmdbImageUrl } from "../../lib/tmdb";
import { notFound } from "next/navigation";
import BackButton from "@/app/ui/backButton";

export default async function Genre({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movieList = await searchMoviesByGenre(parseInt(id));
  if (!movieList) notFound();

  return (
    <>
      <BackButton />
      {movieList.map((movie) => (
        <Link key={movie.id} href={ROUTES.detail(movie.id.toString())}>
          <h2>{movie.title}</h2>
          <p>Release Date: {movie.release_date}</p>
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
