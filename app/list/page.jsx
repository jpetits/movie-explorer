import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/app/routing/constants";
import { fetchPopularMovies } from "../lib/data";
import { tmdbImageUrl } from "../lib/tmdb";

export default async function List() {
  const movieList = await fetchPopularMovies();

  return (
    <>
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