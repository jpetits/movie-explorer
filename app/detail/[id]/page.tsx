import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchMovie, tmdbImageUrl } from "../../lib/data";
import BackButton from "@/app/ui/backButton";

export default async function Detail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await fetchMovie(parseInt(id, 10));
  if (!movie) notFound();

  return (
    <>
      <div className="p-6">
        <BackButton />
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
      </div>
    </>
  );
}
