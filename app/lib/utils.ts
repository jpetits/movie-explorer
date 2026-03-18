import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Result } from "../types/types";
import { Movie } from "./schema";

export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs));
}

export function formatYear(date: string) {
  if (!date) return "TBA";
  return new Date(date).getFullYear();
}

export function formatDate(date: string | undefined) {
  if (!date) return "TBA";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function unwrapResult<T>(
  result: Result<T> | null,
  fallback: T,
): { data: T; error: string | null } {
  if (!result) return { data: fallback, error: null };
  return result.success
    ? { data: result.data, error: null }
    : { data: fallback, error: result.error };
}

export function deduplicateIds<T extends { id: number }>(
  current: T[],
  moviesToAppend: T[],
): T[] {
  const prevIdList = new Set(current.map((movie) => movie.id));
  const uniqueList = moviesToAppend.filter(
    (movie) => !prevIdList.has(movie.id),
  );
  return [...current, ...uniqueList];
}
