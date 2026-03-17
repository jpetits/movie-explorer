export type Movie = {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string | undefined;
  overview?: string;
  backdrop_path?: string;
  genres?: { id: number; name: string }[];
  runtime?: number;
  tagline?: string;
};
