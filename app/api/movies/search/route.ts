import { z } from "zod";
import { searchMovies } from "@/app/lib/data";
import { TMDB_MAX_PAGE } from "@/app/lib/tmdb";

const SearchParamsSchema = z.object({
  query: z.string().min(1).max(100).trim(),
  page: z.coerce.number().int().min(1).max(TMDB_MAX_PAGE).default(1),
});

export const revalidate = 600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const result = SearchParamsSchema.safeParse({
    query: searchParams.get("query"),
    page: searchParams.get("page"),
  });
  if (!result.success) {
    return Response.json({ error: result.error.name }, { status: 400 });
  }
  const { query: searchQuery, page } = result.data;
  const movies = await searchMovies(searchQuery, page);
  return Response.json(movies);
}
