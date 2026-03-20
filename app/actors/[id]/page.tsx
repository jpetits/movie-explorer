import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchActor, fetchDiscoverMovies } from "../../lib/data";
import BackButton from "@/app/ui/dashboard/backButton";
import { tmdbImageUrl } from "../../lib/tmdb";
import { formatDate } from "@/app/lib/utils";
import { ROUTES } from "@/app/routing/constants";
import StarIcon from "@heroicons/react/24/solid/esm/StarIcon";
import MovieList from "@/app/ui/movies/movieList";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const actor = await fetchActor(Number(id));
  return {
    title: actor.name,
    openGraph: {
      title: actor.name,
      images: actor.profile_path
        ? [`${tmdbImageUrl}${actor.profile_path}`]
        : [],
    },
  };
}

export default async function Actor({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const actorId = Number(id);
  if (!actorId) {
    notFound();
  }
  const [actor, movies] = await Promise.all([
    fetchActor(actorId),
    fetchDiscoverMovies({ actorId, page: 1 }),
  ]);

  return (
    <div>
      <BackButton />
      <div className="flex flex-col md:flex-row gap-8">
        {actor.profile_path && (
          <div className="w-full md:w-64 shrink-0">
            <div className="aspect-[2/3] relative rounded-lg overflow-hidden">
              <Image
                src={`${tmdbImageUrl}${actor.profile_path}`}
                alt={actor.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 256px"
              />
            </div>
          </div>
        )}
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold text-zinc-10">{actor.name}</h1>
          <div className="flex gap-4 text-sm text-zinc-400">
            <span>{formatDate(actor.birthday ?? "")}</span>
            <span className="flex items-center gap-1">
              <StarIcon
                className="h-3 w-3 text-yellow-400"
                aria-hidden="true"
              />
              {Number(actor.popularity).toFixed(1)}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-zinc-100">Movies</h2>
        <MovieList
          initialMovieList={movies}
          fetchMorePath={ROUTES.api.discover({ actorId })}
        />
      </div>
    </div>
  );
}
