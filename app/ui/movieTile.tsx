import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Movie } from "../lib/schema";
import { ROUTES } from "../routing/constants";
import { formatDate } from "../lib/utils";
import { tmdbImageUrl } from "../lib/tmdb";
import { StarIcon } from "@heroicons/react/24/outline";

export default function MovieTile({ movie }: { movie: Movie }) {
  const { title, release_date, poster_path } = movie;
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      prefetch={false}
      key={movie.id}
      href={ROUTES.movie(movie.id.toString())}
      className="group relative block rounded-sm bg-zinc-90"
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
          />
        ) : (
          <div className="h-full bg-gray-200 rounded-lg mb-2 flex items-center justify-center  hover:scale-105 transition-transform">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
        <h2 className="text-lg font-bold">{title}</h2>
        <p>{formatDate(release_date)}</p>
        <p className="flex items-center">
          <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
          <span className="font-medium text-sm">
            {Number(movie.vote_average).toFixed(1)}
          </span>{" "}
          / 10
        </p>
      </div>
    </Link>
  );
}
