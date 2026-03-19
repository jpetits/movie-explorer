import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Result } from "../types/types";

export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | undefined) {
  if (!date) return "TBA";
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return "TBA";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsedDate);
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
  nextToAppend: T[],
): T[] {
  const prevIdList = new Set(current.map((item) => item.id));
  const uniqueList = nextToAppend.filter((item) => !prevIdList.has(item.id));
  return [...current, ...uniqueList];
}

export async function withResult<T>(
  promise: Promise<T>,
  error: string,
): Promise<Result<T>> {
  try {
    return { success: true as const, data: await promise };
  } catch {
    return { success: false as const, error };
  }
}
