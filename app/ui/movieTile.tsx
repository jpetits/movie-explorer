import Link from "next/link";
import Image from "next/image";
import { Movie } from "../lib/schema";
import { ROUTES } from "../routing/constants";
import { formatDate } from "../lib/utils";
import { tmdbImageUrl } from "../lib/tmdb";

export default function MovieTile({ movie }: { movie: Movie }) {
  const { title, release_date, poster_path } = movie;

  return (
    <Link key={movie.id} href={ROUTES.detail(movie.id.toString())}>
      <h2>{title}</h2>
      <p>Release Date: {formatDate(release_date)}</p>
      <p>Rating: {movie.vote_average}</p>
      {poster_path && (
        <Image
          src={`${tmdbImageUrl}${poster_path}`}
          alt={title}
          width={250}
          height={375}
        />
      )}
    </Link>
  );
}
