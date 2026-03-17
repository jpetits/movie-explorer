import Image from "next/image";
import Link from "next/link";
import { fetchPopularMovies, tmdbImageUrl } from "../lib/data";

export default async function List() {
  const movieList = await fetchPopularMovies();

  return (
    <>
      {movieList.map((movie) => (
        <Link key={movie.id} href={`/detail/${movie.id}`}>
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