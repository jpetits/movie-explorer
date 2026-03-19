import { Movie } from "../lib/schema";
import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useInfiniteMovies(
  initialMovieList: Movie[],
  fetchMore: (page: number) => Promise<Movie[]>,
  ref: React.RefObject<HTMLDivElement | null>,
) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
    useInfiniteQuery({
      queryKey: ["movies"],
      queryFn: async ({ pageParam }) => await fetchMore(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, _, lastPageParam) =>
        lastPage.length > 0 ? lastPageParam + 1 : undefined,
      initialData: {
        pages: [initialMovieList],
        pageParams: [1],
      },
      staleTime: Infinity,
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage &&
          !error
        ) {
          observer.disconnect();
          fetchNextPage();
        }
      },
      { rootMargin: "200px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, error, ref]);

  return { data, hasNextPage, isFetchingNextPage, error };
}
