import { TMDB } from "tmdb-ts";

export const tmdbImageUrl = "https://image.tmdb.org/t/p/w500";

export function getTmdb() {
  return new TMDB(process.env.TMDB_API_READ_ACCESS_TOKEN!);
}
