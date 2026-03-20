import { z } from "zod";
import { TMDB_MAX_PAGE } from "./tmdb";

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  release_date: z.string().optional(),
  vote_average: z.number(),
  poster_path: z.string().nullable().optional(),
  overview: z.string().optional(),
  backdrop_path: z.string().nullable().optional(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })).optional(),
  runtime: z.number().optional(),
  tagline: z.string().optional(),
});

export type Movie = z.infer<typeof MovieSchema>;

export const MovieListSchema = z.array(MovieSchema);

export const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type Genre = z.infer<typeof GenreSchema>;

export const ActorSchema = z.object({
  id: z.number(),
  name: z.string(),
  profile_path: z.string().nullable().optional(),
  birthday: z.string().nullable().optional(),
  popularity: z.number(),
});

export type Actor = z.infer<typeof ActorSchema>;

export const ActorListSchema = z.array(ActorSchema);

export type ActorList = z.infer<typeof ActorListSchema>;

export const DiscoverParamsSchema = z.object({
  page: z.coerce.number().int().min(1).max(TMDB_MAX_PAGE).default(1),
  genreId: z.coerce.number().int().min(1).optional().nullable(),
  actorId: z.coerce.number().int().min(1).optional().nullable(),
});

export type DiscoverFilters = z.infer<typeof DiscoverParamsSchema>;
