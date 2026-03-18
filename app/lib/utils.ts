import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs));
}

export function formatYear(date: string) {
  if (!date) return "TBA";
  return new Date(date).getFullYear();
}

export function formatDate(date: string) {
  if (!date) return "TBA";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
