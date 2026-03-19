import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchMovie, fetchSimilarMovies } from "../../lib/data";
import BackButton from "@/app/ui/dashboard/backButton";
import { tmdbImageUrl } from "../../lib/tmdb";
import { formatDate } from "@/app/lib/utils";
import { ROUTES } from "@/app/routing/constants";
import MovieList from "@/app/ui/movies/movieList";

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
    <div>
      <BackButton />
      <div className="flex flex-col md:flex-row gap-8">
        {movie.poster_path && (
          <div className="w-full md:w-64 shrink-0">
            <div className="aspect-[2/3] relative rounded-lg overflow-hidden">
              <Image
                src={`${tmdbImageUrl}${movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 256px"
              />
            </div>
          </div>
        )}
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold text-zinc-10">{movie.title}</h1>
          <div className="flex gap-4 text-sm text-zinc-400">
            <span>{formatDate(movie.release_date)}</span>
            {movie.runtime && (
              <span>
                {movie.runtime}
                min
              </span>
            )}
            <span className="text-yellow-400 font-medium">
              ★ {Number(movie.vote_average).toFixed(1)}
            </span>
          </div>
          {movie.overview && (
            <p className="text-zinc-300 leading-relaxed max-w-2xl">
              {movie.overview}
            </p>
          )}
          {movie.tagline && (
            <p className="text-zinc-400 italic">{movie.tagline}</p>
          )}
          <div className="flex flex-wrap gap-2">
            {movie.genres?.map((genre) => (
              <Link
                key={genre.id}
                href={ROUTES.genre(genre.id.toString())}
                className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs hover:bg-zinc-700 transition-colors"
              >
                {genre.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {similarMovieList.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-zinc-100 mb-4">
            Similar Movies
          </h2>
          <MovieList
            initialMovieList={similarMovieList}
            fetchMorePath={ROUTES.api.similarMovies(movieId.toString())}
          />
        </div>
      )}
    </div>
  );
}
