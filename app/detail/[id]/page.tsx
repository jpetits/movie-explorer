import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchMovie, similarMovies } from "../../lib/data";
import BackButton from "@/app/ui/backButton";
import { tmdbImageUrl } from "../../lib/tmdb";
import Link from "next/link";
import { ROUTES } from "@/app/routing/constants";

export default async function Detail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movieId = parseInt(id);
  const movie = await fetchMovie(movieId);
  const similarMovieList = await similarMovies(movieId);
  if (!movie) notFound();

  return (
    <>
      <div className="p-6">
        <BackButton />
        <h2>{movie.title}</h2>
        <p>Release Date: {movie.release_date}</p>
        <p>Rating: {movie.vote_average}</p>
        {movie.overview && <p>{movie.overview}</p>}
        {movie.tagline && <p className="italic">{movie.tagline}</p>}
        {movie.genres && (
          <p>
            Genres:{" "}
            {movie.genres.map((genre) => (
              <Link
                key={genre.id}
                href={ROUTES.genre(genre.id.toString())}
                className="mr-2"
              >
                {genre.name}
              </Link>
            ))}
          </p>
        )}
        {movie.runtime && <p>Runtime: {movie.runtime} minutes</p>}
        {movie.poster_path && (
          <Image
            src={`${tmdbImageUrl}${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={750}
          />
        )}
        {similarMovieList.length > 0 && (
          <div className="mt-6">
            <h3>Similar Movies</h3>
            <ul>
              {similarMovieList.map((similar) => (
                <li key={similar.id}>
                  <Link href={ROUTES.detail(similar.id.toString())}>
                    {similar.title} ({similar.release_date})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
