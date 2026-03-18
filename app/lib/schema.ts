import { z } from "zod";

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
