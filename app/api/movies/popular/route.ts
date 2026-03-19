import { z } from "zod";
import { TMDB_MAX_PAGE } from "@/app/lib/tmdb";
import { fetchPopularMovies } from "@/app/lib/data";

const PopularParamsSchema = z.object({
  page: z.coerce.number().int().min(1).max(TMDB_MAX_PAGE).default(1),
});

export const revalidate = 3600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const result = PopularParamsSchema.safeParse({
    page: searchParams.get("page"),
  });
  if (!result.success) {
    return Response.json({ error: result.error.name }, { status: 400 });
  }
  const { page } = result.data;
  const movies = await fetchPopularMovies(page);
  return Response.json(movies);
}
