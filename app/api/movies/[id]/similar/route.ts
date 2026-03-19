import { z } from "zod";
import { TMDB_MAX_PAGE } from "@/app/lib/tmdb";
import { fetchSimilarMovies } from "@/app/lib/data";

const SimilarParamsSchema = z.object({
  page: z.coerce.number().int().min(1).max(TMDB_MAX_PAGE).default(1),
  movieId: z.coerce.number().int().min(1),
});
export const revalidate = 3600;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const result = SimilarParamsSchema.safeParse({
    page: searchParams.get("page"),
    movieId: id,
  });
  if (!result.success) {
    return Response.json({ error: result.error.name }, { status: 400 });
  }
  const { page, movieId } = result.data;
  const movies = await fetchSimilarMovies(movieId, page);
  return Response.json(movies);
}
