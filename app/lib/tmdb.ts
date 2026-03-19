import { TMDB } from "tmdb-ts";

export const tmdbImageUrl = "https://image.tmdb.org/t/p/w500";
export const TMDB_MAX_PAGE = 500;

export function getTmdb() {
  const token = process.env.TMDB_API_READ_ACCESS_TOKEN;
  if (!token) throw new Error("Missing TMDB_API_READ_ACCESS_TOKEN");
  return new TMDB(token);
}
