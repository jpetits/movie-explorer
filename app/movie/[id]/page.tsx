import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchMovie, fetchSimilarMovies } from "../../lib/data";
import BackButton from "@/app/ui/backButton";
import { tmdbImageUrl } from "../../lib/tmdb";
import { formatDate } from "@/app/lib/utils";
import { ROUTES } from "@/app/routing/constants";
import MovieList from "@/app/ui/movieList";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await fetchMovie(Number(id));
  return {
    title: movie.title,
    description: movie.overview,
    openGraph: {
      title: movie.title,
      description: movie.overview,
      images: movie.poster_path ? [`${tmdbImageUrl}${movie.poster_path}`] : [],
    },
  };
}

export default async function Movie({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movieId = Number(id);
  if (!movieId) {
    notFound();
  }
  const [movie, similarMovieList] = await Promise.all([
    fetchMovie(movieId),
    fetchSimilarMovies(movieId, 1),
  ]);

  return (
    <div className="p-6">
      <BackButton />
      <h2>{movie.title}</h2>
      <p>Release Date: {formatDate(movie.release_date)}</p>
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
          <MovieList
            initialMovieList={similarMovieList}
            fetchMorePath={ROUTES.api.similarMovies(movieId.toString())}
          />
        </div>
      )}
    </div>
  );
}
