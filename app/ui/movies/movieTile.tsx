import Link from "next/link";
import Image from "next/image";
import { useState, memo } from "react";
import { Movie } from "../../lib/schema";
import { ROUTES } from "../../routing/constants";
import { formatDate } from "../../lib/utils";
import { tmdbImageUrl } from "../../lib/tmdb";
import { StarIcon } from "@heroicons/react/24/outline";

const MovieTile = memo(function MovieTile({
  movie,
  priority,
}: {
  movie: Movie;
  priority?: boolean;
}) {
  const { title, release_date, poster_path } = movie;
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      prefetch={false}
      key={movie.id}
      href={ROUTES.movie(movie.id.toString())}
      className="group block rounded-lg overflow-hidden bg-zinc-900 hover:ring-2 hover:ring-zinc-500 transition-all"
    >
      <div className="aspect-2/3 relative">
        {poster_path && !imgError ? (
          <Image
            src={`${tmdbImageUrl}${poster_path}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-lg"
            alt={title}
            onError={() => setImgError(true)}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
          />
        ) : (
          <div className="h-full bg-zinc-800 flex items-center justify-center hover:scale-105 transition-transform">
            <span className="text-zinc-500 text-sm">No Image</span>
          </div>
        )}
      </div>
      <div className="p-2">
        <h2 className="text-sm font-semibold text-zinc-100 truncate">
          {title}
        </h2>
        <p className="text-xs text-zinc-400 mt-0.5">
          {formatDate(release_date)}
        </p>
        <p className="flex items-center gap-1 mt-1">
          <StarIcon className="h-3 w-3 text-yellow-400" aria-hidden="true" />
          <span className="text-xs text-zinc-300">
            {Number(movie.vote_average).toFixed(1)}
          </span>
        </p>
      </div>
    </Link>
  );
});

export default MovieTile;
