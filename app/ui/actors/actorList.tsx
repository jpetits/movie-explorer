"use client";

import { useRef } from "react";
import { Actor } from "../../lib/schema";
import ActorTile from "./actorTile";
import { usePaginatedScroll } from "../../hooks/usePaginatedScroll";
import { ActorListSkeleton } from "../skeletons";

export default function ActorList({
  initialActorList,
  fetchMorePath,
}: {
  initialActorList: Actor[];
  fetchMorePath: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { data, isFetchingNextPage, error } = usePaginatedScroll<Actor>(
    initialActorList,
    fetchMorePath,
    ref,
  );

  return (
    <div className="flex flex-col gap-3">
      {data.pages.map((page, pageIndex) => (
        <div
          key={pageIndex}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
        >
          {page.map((actor: Actor, index: number) => (
            <ActorTile
              key={actor.id}
              actor={actor}
              priority={pageIndex === 0 && index < 6}
            />
          ))}
        </div>
      ))}
      <div ref={ref} />
      {isFetchingNextPage && !error && <ActorListSkeleton />}
      {!isFetchingNextPage && data.pages[0].length === 0 && (
        <p className="mt-12 text-center text-zinc-400">No actors found.</p>
      )}
    </div>
  );
}
