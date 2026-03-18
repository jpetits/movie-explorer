import { Movie } from "../lib/schema";
import { Result } from "../types/types";
import { useEffect } from "react";
import { unwrapResult } from "../lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useInfiniteMovies(
  initialMovieList: Movie[],
  fetchMore: (page: number) => Promise<Result<Movie[]>>,
  ref: React.RefObject<HTMLDivElement | null>,
) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["movies"],
      queryFn: async ({ pageParam }) => {
        const result = await fetchMore(pageParam);
        const { data, error } = unwrapResult(result, []);
        if (error) throw new Error(error);
        return data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, _, lastPageParam) =>
        lastPage.length > 0 ? lastPageParam + 1 : undefined,
      initialData: {
        pages: [initialMovieList],
        pageParams: [1],
      },
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          observer.disconnect();
          fetchNextPage();
        }
      },
      { rootMargin: "200px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, ref]);

  return { data, hasNextPage, isFetchingNextPage };
}
